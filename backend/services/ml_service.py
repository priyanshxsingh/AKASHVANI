import sys
from pathlib import Path

# Add the project root to Python's import path
ROOT_DIR = Path(__file__).resolve().parents[2]

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from ml.fusion_engine import (
    get_all_station_fusion_data,
    get_station_fusion_data,
)

from ml.ml_engine import (
    predict_flood_probability,
    MODEL_FEATURE_ORDER,
)

from ml.risk_engine import build_station_payload


def get_model_features():
    return MODEL_FEATURE_ORDER


def get_all_fused_data():
    return get_all_station_fusion_data()


def get_fused_data_for_city(city):
    return get_station_fusion_data(city)


def predict_station(station):
    probability = predict_flood_probability(station)

    return build_station_payload(
        station,
        probability
    )


def predict_all_stations():
    fused = get_all_station_fusion_data()

    return [
        predict_station(station)
        for station in fused
    ]