// Central place for all backend calls. Base URL comes from a Vite env var
// so you can point the dashboard at localhost in dev and a real host in prod.
//
// .env (dev):        VITE_API_BASE_URL=http://localhost:8000
// .env.production:   VITE_API_BASE_URL=https://your-api-host.example.com

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function getJSON(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

/** Full ML-scored station list — the primary feed for the dashboard. */
export function fetchFloodPredictions() {
  return getJSON("/api/predict/flood");
}

/** Raw fused sensor readings (radar + satellite + NWP), pre-ML. */
export function fetchLiveData() {
  return getJSON("/api/live-data");
}

/** Aggregate risk counters (high/moderate/low, total population). */
export function fetchRiskSummary() {
  return getJSON("/api/risk");
}

/** Active alerts, sorted by severity. */
export function fetchAlerts() {
  return getJSON("/api/alerts");
}

/** NDRF tactical deployment recommendations. */
export function fetchNdrf() {
  return getJSON("/api/ndrf");
}
