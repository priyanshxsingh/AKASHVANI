"""
ML ENGINE
---------
Loads AKASHVANI_AI_MODEL.joblib (a scikit-learn RandomForestClassifier
trained to predict flood occurrence, classes_ = [0, 1]) and scores fused
sensor readings into a flood probability (0-100%).

n_features_in_ = 16, feature order fixed by feature_names_in_ on the
fitted estimator — MODEL_FEATURE_ORDER below mirrors that exactly. If you
retrain the model, keep this list in sync with the training dataframe's
column order.
"""

from pathlib import Path
import warnings

import joblib
import pandas as pd

MODEL_PATH = Path(__file__).parent / "model" / "AKASHVANI_AI_MODEL.joblib"

# Must match model.feature_names_in_ exactly (order matters).
MODEL_FEATURE_ORDER = [
    "Latitude",
    "Longitude",
    "Satellite Precipitation (mm)",
    "Cloud Cover (%)",
    "Cloud Top Temperature (°C)",
    "Land Surface Temperature (°C)",
    "Radar Reflectivity",
    "Radar Rainfall Rate",
    "Storm Movement",
    "Radar Echo Intensity",
    "NWP Rainfall Forecast 1h",
    "NWP Rainfall Forecast 3h",
    "NWP Rainfall Forecast 6h",
    "NWP Temperature Forecast (°C)",
    "NWP Wind Forecast (m/s)",
    "NWP Pressure Forecast (Pa)",
]

with warnings.catch_warnings():
    # Silence sklearn's cross-version unpickle warning; keep failures loud.
    warnings.simplefilter("ignore")
    _model = joblib.load(MODEL_PATH)

# Validate model compatibility
if getattr(_model, "n_features_in_", None) != len(MODEL_FEATURE_ORDER):
    raise ValueError(
        f"Model expects {_model.n_features_in_} features, "
        f"but AKASHVANI expects {len(MODEL_FEATURE_ORDER)}."
    )

if hasattr(_model, "feature_names_in_"):
    if list(_model.feature_names_in_) != MODEL_FEATURE_ORDER:
        raise ValueError(
            "Model feature names/order do not match MODEL_FEATURE_ORDER."
        )

if list(_model.classes_) != [0, 1]:
    raise ValueError(
        f"Expected model classes [0, 1], got {_model.classes_.tolist()}"
    )


def _vector_from_fusion(fusion_row: dict) -> pd.DataFrame:
    # A one-row DataFrame with matching column names avoids sklearn's
    # "X does not have valid feature names" warning and is safer against
    # accidental column reordering than a raw array.
    return pd.DataFrame([{feat: fusion_row[feat] for feat in MODEL_FEATURE_ORDER}])


def predict_flood_probability(fusion_row: dict) -> float:
    """Returns flood probability as a percentage (0-100), 2 decimal places."""
    x = _vector_from_fusion(fusion_row)
    # classes_ == [0, 1] -> column 1 is P(flood=1)
    proba = _model.predict_proba(x)[0][1]
    return round(float(proba) * 100, 2)
