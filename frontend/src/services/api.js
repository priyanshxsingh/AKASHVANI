const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function getJSON(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(
      `${path} failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export function fetchFloodPredictions() {
  return getJSON("/api/predict/flood");
}

export function fetchLiveData() {
  return getJSON("/api/live-data");
}

export function fetchRiskSummary() {
  return getJSON("/api/risk");
}

export function fetchAlerts() {
  return getJSON("/api/alerts");
}

export function fetchNdrf() {
  return getJSON("/api/ndrf");
}