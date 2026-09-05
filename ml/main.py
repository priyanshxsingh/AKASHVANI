"""
AKASHVANI — AI Flood Early Warning System
Backend: FastAPI

Architecture (matches system diagram):

  React Dashboard  --HTTP-->  FastAPI Backend
                                 |
                                 |-- /api/live-data        (raw fused sensor feed)
                                 |-- /api/predict/rainfall  (rainfall forecast)
                                 |-- /api/predict/flood     (flood probability, ML)
                                 |-- /api/risk              (risk breakdown)
                                 |-- /api/alerts            (high-risk alerts)
                                 |-- /api/ndrf              (tactical response)
                                 |
                              Data Fusion Engine  -->  ML Engine (RandomForest .joblib)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from fusion_engine import get_all_station_fusion_data, get_station_fusion_data, STATIONS_META
from ml_engine import predict_flood_probability, MODEL_FEATURE_ORDER
from risk_engine import build_station_payload

app = FastAPI(title="AKASHVANI Flood Early Warning API", version="1.0.0")

# Allow the Vite dev server / deployed frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok", "model_loaded": True, "features": MODEL_FEATURE_ORDER}


# ---------------------------------------------------------------------------
# DATA FUSION ENGINE
# Radar + Satellite + Weather Station + NWP + DEM + River + Historical data
# ---------------------------------------------------------------------------
@app.get("/api/live-data")
def live_data():
    """Raw fused sensor readings for every monitored station, before ML scoring."""
    return {"stations": get_all_station_fusion_data()}


@app.get("/api/live-data/{city}")
def live_data_for_city(city: str):
    data = get_station_fusion_data(city)
    if data is None:
        raise HTTPException(status_code=404, detail=f"No fusion data for station '{city}'")
    return data


# ---------------------------------------------------------------------------
# ML ENGINE
# ---------------------------------------------------------------------------
@app.get("/api/predict/rainfall")
def predict_rainfall():
    """Rainfall forecast (satellite-observed + NWP 3h forecast) per station."""
    fused = get_all_station_fusion_data()
    return {
        "stations": [
            {
                "city": s["city"],
                "state": s["state"],
                "satellite_rainfall_mm": s["Satellite Precipitation (mm)"],
                "nwp_forecast_3h_mm": s["NWP Rainfall Forecast 3h"],
            }
            for s in fused
        ]
    }


@app.get("/api/predict/flood")
def predict_flood():
    """
    Full ML-scored dashboard payload: one object per station shaped exactly
    like the dashboard's `stations` array (city, state, rainfall, nwp,
    probability, population, priority, corridor, equipment).
    This is the primary endpoint the React dashboard polls.
    """
    fused = get_all_station_fusion_data()
    results = []
    for s in fused:
        probability = predict_flood_probability(s)
        results.append(build_station_payload(s, probability))
    return {"stations": results}


@app.get("/api/predict/flood/{city}")
def predict_flood_city(city: str):
    fused = get_station_fusion_data(city)
    if fused is None:
        raise HTTPException(status_code=404, detail=f"No station named '{city}'")
    probability = predict_flood_probability(fused)
    return build_station_payload(fused, probability)


# ---------------------------------------------------------------------------
# RISK / ALERTS / NDRF
# ---------------------------------------------------------------------------
@app.get("/api/risk")
def risk_summary():
    fused = get_all_station_fusion_data()
    scored = [build_station_payload(s, predict_flood_probability(s)) for s in fused]
    high = [s for s in scored if s["probability"] >= 75]
    moderate = [s for s in scored if 50 <= s["probability"] < 75]
    low = [s for s in scored if s["probability"] < 50]
    return {
        "total_stations": len(scored),
        "high_risk_count": len(high),
        "moderate_risk_count": len(moderate),
        "low_risk_count": len(low),
        "total_population_monitored": sum(s["population"] for s in scored),
    }


@app.get("/api/alerts")
def alerts():
    """High/moderate risk stations formatted as actionable alerts."""
    fused = get_all_station_fusion_data()
    scored = [build_station_payload(s, predict_flood_probability(s)) for s in fused]
    active = [s for s in scored if s["probability"] >= 50]
    active.sort(key=lambda s: s["probability"], reverse=True)
    return {
        "alerts": [
            {
                "city": s["city"],
                "state": s["state"],
                "severity": "CRITICAL" if s["probability"] >= 75 else "WARNING",
                "probability": s["probability"],
                "population_at_risk": s["population"],
                "message": (
                    f"{s['city']}, {s['state']}: {s['probability']}% flood probability "
                    f"— {s['population']:,} people in impact zone."
                ),
            }
            for s in active
        ]
    }


@app.get("/api/ndrf")
def ndrf_response():
    """Recommended NDRF deployment per station."""
    fused = get_all_station_fusion_data()
    scored = [build_station_payload(s, predict_flood_probability(s)) for s in fused]
    return {
        "deployments": [
            {
                "city": s["city"],
                "state": s["state"],
                "priority": s["priority"],
                "population": s["population"],
                "corridor": s["corridor"],
                "equipment": s["equipment"],
                "road_status": "Highway Blocked" if s["probability"] >= 75 else "Roads Clear",
            }
            for s in scored
        ]
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
