from pydantic import BaseModel
from typing import List


class StationPrediction(BaseModel):
    city: str
    state: str

    rainfall: float
    nwp: float

    rainfall_1h: float
    rainfall_3h: float
    rainfall_6h: float

    temperature: float
    wind: float
    pressure: float

    probability: float
    population: int
    priority: int
    corridor: str
    equipment: str


class FloodPredictionResponse(BaseModel):
    stations: List[StationPrediction]


class RainfallStation(BaseModel):
    city: str
    state: str
    satellite_rainfall_mm: float
    nwp_forecast_3h_mm: float


class RainfallResponse(BaseModel):
    stations: List[RainfallStation]


class RiskSummary(BaseModel):
    total_stations: int
    high_risk_count: int
    moderate_risk_count: int
    low_risk_count: int
    total_population_monitored: int


class Alert(BaseModel):
    city: str
    state: str
    severity: str
    probability: float
    population_at_risk: int
    message: str


class AlertsResponse(BaseModel):
    alerts: List[Alert]


class NdrfDeployment(BaseModel):
    city: str
    state: str
    priority: int
    population: int
    corridor: str
    equipment: str
    road_status: str


class NdrfResponse(BaseModel):
    deployments: List[NdrfDeployment]


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    features: List[str]