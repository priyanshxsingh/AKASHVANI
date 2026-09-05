"""
Maps a fused reading + ML flood probability into the exact object shape the
React dashboard renders (same fields as the old hardcoded `stations` array),
plus the tactical NDRF fields.
"""


def _risk_level(probability: float) -> str:
    if probability >= 75:
        return "high"
    if probability >= 50:
        return "moderate"
    return "low"


def _tactical_response(risk: str):
    if risk == "high":
        return {
            "priority": 1,
            "corridor": "Elevated bypass corridor",
            "equipment": "Heavy waterlogging equipment",
        }
    if risk == "moderate":
        return {
            "priority": 2,
            "corridor": "Passable with high-clearance vehicles",
            "equipment": "Standby on trailer",
        }
    return {
        "priority": 3,
        "corridor": "Normal transit authorized",
        "equipment": "Not required",
    }


def build_station_payload(fusion_row: dict, probability: float) -> dict:
    risk = _risk_level(probability)
    tactical = _tactical_response(risk)

    return {
        "city": fusion_row["city"],
        "state": fusion_row["state"],
        "rainfall": fusion_row["Satellite Precipitation (mm)"],
        "nwp": fusion_row["NWP Rainfall Forecast 3h"],
        "probability": probability,
        "population": fusion_row["population"],
        "priority": tactical["priority"],
        "corridor": tactical["corridor"],
        "equipment": tactical["equipment"],
    }
