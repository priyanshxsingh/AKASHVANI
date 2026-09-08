"""
AKASHVANI — AI Flood Early Warning System

Backend: FastAPI

Architecture:

React Dashboard
       |
       | HTTP
       v
FastAPI Backend
       |
       v
ML Service
       |
       v
ML Engine / Data Fusion
       |
       v
RandomForest Model
"""

from dotenv import load_dotenv

load_dotenv()

from backend.config import settings

from schemas import (
    HealthResponse,
    FloodPredictionResponse,
    RainfallResponse,
    StationPrediction,
    RiskSummary,
    AlertsResponse,
    NdrfResponse,
)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.ml_service import (
    get_model_features,
    get_all_fused_data,
    get_fused_data_for_city,
    predict_station,
    predict_all_stations,
)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)


# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# HEALTH
# ---------------------------------------------------------------------------

@app.get("/api/health", response_model=HealthResponse)
def health():

    return {
        "status": "ok",
        "model_loaded": True,
        "features": get_model_features(),
    }


# ---------------------------------------------------------------------------
# DATA FUSION
# ---------------------------------------------------------------------------

@app.get("/api/live-data")
def live_data():

    return {
        "stations": get_all_fused_data()
    }


# ---------------------------------------------------------------------------
# RAINFALL
# ---------------------------------------------------------------------------

@app.get(
    "/api/predict/rainfall",
    response_model=RainfallResponse
)
def predict_rainfall():

    fused = get_all_fused_data()

    return {
        "stations": [
            {
                "city": station["city"],
                "state": station["state"],
                "satellite_rainfall_mm": station[
                    "Satellite Precipitation (mm)"
                ],
                "nwp_forecast_3h_mm": station[
                    "NWP Rainfall Forecast 3h"
                ],
            }
            for station in fused
        ]
    }


# ---------------------------------------------------------------------------
# FLOOD PREDICTION
# ---------------------------------------------------------------------------

@app.get(
    "/api/predict/flood",
    response_model=FloodPredictionResponse
)
def predict_flood():

    results = predict_all_stations()

    return {
        "stations": results
    }


@app.get(
    "/api/predict/flood/{city}",
    response_model=StationPrediction
)
def predict_flood_city(city: str):

    station = get_fused_data_for_city(city)

    if station is None:
        raise HTTPException(
            status_code=404,
            detail=f"No station named '{city}'"
        )

    return predict_station(station)


# ---------------------------------------------------------------------------
# RISK
# ---------------------------------------------------------------------------

@app.get(
    "/api/risk",
    response_model=RiskSummary
)
def risk_summary():

    scored = predict_all_stations()

    high = [
        station
        for station in scored
        if station["probability"] >= 75
    ]

    moderate = [
        station
        for station in scored
        if 50 <= station["probability"] < 75
    ]

    low = [
        station
        for station in scored
        if station["probability"] < 50
    ]

    return {
        "total_stations": len(scored),

        "high_risk_count": len(high),

        "moderate_risk_count": len(moderate),

        "low_risk_count": len(low),

        "total_population_monitored": sum(
            station["population"]
            for station in scored
        ),
    }


# ---------------------------------------------------------------------------
# ALERTS
# ---------------------------------------------------------------------------

@app.get(
    "/api/alerts",
    response_model=AlertsResponse
)
def alerts():

    scored = predict_all_stations()

    active = [
        station
        for station in scored
        if station["probability"] >= 50
    ]

    active.sort(
        key=lambda station: station["probability"],
        reverse=True
    )

    return {
        "alerts": [
            {
                "city": station["city"],

                "state": station["state"],

                "severity": (
                    "CRITICAL"
                    if station["probability"] >= 75
                    else "WARNING"
                ),

                "probability": station["probability"],

                "population_at_risk": station["population"],

                "message": (
                    f"{station['city']}, {station['state']}: "
                    f"{station['probability']}% flood probability "
                    f"— {station['population']:,} people in impact zone."
                ),
            }

            for station in active
        ]
    }


# ---------------------------------------------------------------------------
# NDRF RESPONSE
# ---------------------------------------------------------------------------

@app.get(
    "/api/ndrf",
    response_model=NdrfResponse
)
def ndrf_response():

    scored = predict_all_stations()

    return {
        "deployments": [
            {
                "city": station["city"],

                "state": station["state"],

                "priority": station["priority"],

                "population": station["population"],

                "corridor": station["corridor"],

                "equipment": station["equipment"],

                "road_status": (
                    "Highway Blocked"
                    if station["probability"] >= 75
                    else "Roads Clear"
                ),
            }

            for station in scored
        ]
    }


# ---------------------------------------------------------------------------
# LOCAL DEVELOPMENT
# ---------------------------------------------------------------------------

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )