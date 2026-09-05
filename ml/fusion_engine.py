"""
DATA FUSION ENGINE
------------------
Combines Radar + Satellite + Weather Station + NWP (+ DEM / river / historical
flood data, when wired to real sources) into the exact 16-feature vector the
trained model expects:

    Latitude, Longitude, Satellite Precipitation (mm), Cloud Cover (%),
    Cloud Top Temperature (°C), Land Surface Temperature (°C),
    Radar Reflectivity, Radar Rainfall Rate, Storm Movement,
    Radar Echo Intensity, NWP Rainfall Forecast 1h, NWP Rainfall Forecast 3h,
    NWP Rainfall Forecast 6h, NWP Temperature Forecast (°C),
    NWP Wind Forecast (m/s), NWP Pressure Forecast (Pa)

Replace `_simulate_reading()` with real calls to your radar/satellite/NWP
providers (IMD, INSAT, GPM, GFS, etc.) when those feeds are available —
every downstream consumer (ML engine, risk engine, API routes) only cares
about this dict shape, not where the numbers came from.
"""

import random
import time

# Static station metadata: real geo-coordinates + population exposure.
STATIONS_META = [
    {"city": "Guwahati", "state": "Assam", "lat": 26.1445, "lon": 91.7362, "population": 45000},
    {"city": "Patna", "state": "Bihar", "lat": 25.5941, "lon": 85.1376, "population": 62000},
    {"city": "Kolkata", "state": "West Bengal", "lat": 22.5726, "lon": 88.3639, "population": 38000},
    {"city": "Cuttack", "state": "Odisha", "lat": 20.4625, "lon": 85.8828, "population": 15000},
    {"city": "Dibrugarh", "state": "Assam", "lat": 27.4728, "lon": 94.9120, "population": 51000},
    {"city": "Muzaffarpur", "state": "Bihar", "lat": 26.1225, "lon": 85.3906, "population": 41000},
]

# Per-city base severity (0=calm, 1=stormy) drives the secondary features
# (cloud cover, radar, wind...) which the model weighs lightly. The two
# dominant features the model actually keys off — Satellite Precipitation
# and NWP Rainfall Forecast 3h — were calibrated by sweeping the *real*
# trained model's predict_proba to find its decision boundary (see notes
# below), so each city's (min, max) band reproduces the intended risk tier
# out of the model itself rather than a hardcoded probability.
#
#   precip < ~18mm & nwp3h < ~12mm   -> model outputs ~15-18%  (low risk)
#   precip ~20-30mm & nwp3h ~14-22mm -> model outputs ~65-85%  (moderate)
#   precip > ~35mm & nwp3h > ~26mm   -> model outputs ~91-94%  (high risk)
_BASE_SEVERITY = {
    "Guwahati": 0.85,
    "Patna": 0.70,
    "Kolkata": 0.60,
    "Cuttack": 0.10,
    "Dibrugarh": 0.90,
    "Muzaffarpur": 0.45,
}

# (min, max) mm bands for the two dominant model features, one entry per
# city. Guwahati/Patna/Kolkata/Dibrugarh sit comfortably inside the model's
# high-risk region; Cuttack sits comfortably inside its low-risk region.
# Muzaffarpur is deliberately placed right on top of the model's decision
# boundary (~21-22mm satellite precip) — this random forest's 150 trees
# don't agree perfectly near that boundary, so Muzaffarpur will genuinely
# flip between "moderate" and "high" from one poll to the next. That's not
# a simulation bug: it's the real trained model expressing forecast
# uncertainty for a borderline station, which is exactly what NDRF command
# would want surfaced rather than smoothed over.
_PRECIP_NWP3H_BAND = {
    "Guwahati": ((75, 95), (65, 85)),      # high risk
    "Patna": ((55, 75), (45, 65)),         # high risk
    "Kolkata": ((38, 50), (32, 45)),       # high risk
    "Cuttack": ((6, 16), (3, 10)),         # low risk
    "Dibrugarh": ((80, 98), (70, 92)),     # high risk
    "Muzaffarpur": ((21.0, 22.0), (14, 18)),  # borderline — model's decision boundary
}


def _jitter(value, spread):
    return value + random.uniform(-spread, spread)


def _rand_in(bounds):
    lo, hi = bounds
    return random.uniform(lo, hi)


def _simulate_reading(meta: dict) -> dict:
    """
    Produces one fused sensor reading for a station, feature-complete for the
    ML model. Satellite precipitation and the NWP 3h forecast are drawn from
    per-city bands calibrated against the model's own decision boundary;
    every other feature is seeded off a general severity score and jittered
    a little each call so the dashboard feels 'live' on each poll.
    """
    sev = _BASE_SEVERITY[meta["city"]]
    precip_band, nwp3h_band = _PRECIP_NWP3H_BAND[meta["city"]]

    satellite_precip = round(_rand_in(precip_band), 1)
    nwp_3h = round(_rand_in(nwp3h_band), 1)

    cloud_cover = min(100.0, max(0.0, _jitter(30 + sev * 65, 5)))
    cloud_top_temp = _jitter(-60 + sev * 20, 3)          # colder tops = deeper storms
    land_surface_temp = _jitter(30 - sev * 6, 1.5)
    radar_reflectivity = max(0.0, _jitter(15 + sev * 45, 4))   # dBZ
    radar_rainfall_rate = max(0.0, _jitter(2 + sev * 38, 3))   # mm/hr
    storm_movement = max(0.0, _jitter(5 + sev * 25, 3))        # km/h
    radar_echo_intensity = max(0.0, _jitter(10 + sev * 50, 4))

    nwp_1h = max(0.0, _jitter(3 + sev * 22, 2))
    nwp_6h = max(0.0, _jitter(nwp_3h * 1.6, 5))
    nwp_temp = _jitter(28 - sev * 4, 1.5)
    nwp_wind = max(0.0, _jitter(3 + sev * 15, 2))
    nwp_pressure = _jitter(100500 - sev * 800, 150)

    return {
        "city": meta["city"],
        "state": meta["state"],
        "population": meta["population"],
        "timestamp": time.time(),
        "Latitude": meta["lat"],
        "Longitude": meta["lon"],
        "Satellite Precipitation (mm)": satellite_precip,
        "Cloud Cover (%)": round(cloud_cover, 1),
        "Cloud Top Temperature (°C)": round(cloud_top_temp, 1),
        "Land Surface Temperature (°C)": round(land_surface_temp, 1),
        "Radar Reflectivity": round(radar_reflectivity, 1),
        "Radar Rainfall Rate": round(radar_rainfall_rate, 1),
        "Storm Movement": round(storm_movement, 1),
        "Radar Echo Intensity": round(radar_echo_intensity, 1),
        "NWP Rainfall Forecast 1h": round(nwp_1h, 1),
        "NWP Rainfall Forecast 3h": nwp_3h,
        "NWP Rainfall Forecast 6h": round(nwp_6h, 1),
        "NWP Temperature Forecast (°C)": round(nwp_temp, 1),
        "NWP Wind Forecast (m/s)": round(nwp_wind, 1),
        "NWP Pressure Forecast (Pa)": round(nwp_pressure, 1),
    }


def get_all_station_fusion_data() -> list[dict]:
    return [_simulate_reading(meta) for meta in STATIONS_META]


def get_station_fusion_data(city: str) -> dict | None:
    for meta in STATIONS_META:
        if meta["city"].lower() == city.lower():
            return _simulate_reading(meta)
    return None
