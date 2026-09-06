const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function getJSON(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    let message = `${path} failed: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();

      if (errorData?.detail) {
        message = errorData.detail;
      }
    } catch {
      // Ignore invalid JSON error response
    }

    throw new Error(message);
  }

  return response.json();
}

/* =========================================================
   FLOOD PREDICTION
========================================================= */

export function fetchFloodPredictions() {
  return getJSON("/api/predict/flood");
}

/* =========================================================
   RAINFALL / WEATHER
========================================================= */

export function fetchRainfallPredictions() {
  return getJSON("/api/predict/rainfall");
}

export function fetchLiveData() {
  return getJSON("/api/live-data");
}

/* =========================================================
   RISK
========================================================= */

export function fetchRiskSummary() {
  return getJSON("/api/risk");
}

/* =========================================================
   ALERTS
========================================================= */

export function fetchAlerts() {
  return getJSON("/api/alerts");
}

/* =========================================================
   NDRF
========================================================= */

export function fetchNdrf() {
  return getJSON("/api/ndrf");
}

/* =========================================================
   SYSTEM HEALTH
========================================================= */

export function fetchSystemStatus() {
  return getJSON("/api/health");
}