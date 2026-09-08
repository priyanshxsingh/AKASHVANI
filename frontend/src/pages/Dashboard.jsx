import { useEffect, useState } from "react";

import StationCard from "../components/dashboard/StationCard";
import StatCard from "../components/dashboard/StatCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import {
  fetchFloodPredictions,
  fetchRiskSummary,
  fetchAlerts,
  fetchNdrf,
} from "../services/api";

/* =========================================================
   RISK HELPERS
========================================================= */

function getRisk(probability) {
  if (probability >= 75) return "high";
  if (probability >= 50) return "moderate";
  return "low";
}

function getRiskData(risk) {
  if (risk === "high") {
    return {
      background: "/images/stromyday.jpg",
      label: "HIGH FLOOD RISK",
      icon: "⚠",
      color: "text-red-100",
      badge: "bg-red-500/25 border-red-300/30",
    };
  }

  if (risk === "moderate") {
    return {
      background: "/images/cloudyDay.jpg",
      label: "MODERATE RISK",
      icon: "◐",
      color: "text-yellow-100",
      badge: "bg-yellow-500/25 border-yellow-300/30",
    };
  }

  return {
    background: "/images/sunnyDay.jpg",
    label: "NORMAL CONDITIONS",
    icon: "✓",
    color: "text-green-100",
    badge: "bg-green-500/25 border-green-300/30",
  };
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function Dashboard() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const [riskSummary, setRiskSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [ndrfDeployments, setNdrfDeployments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =======================================================
     LOAD DASHBOARD DATA
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard(showLoading = false) {
      try {
        if (showLoading) {
          setLoading(true);
        }

        setError(null);

        const [predictionData, riskData, alertData, ndrfData] =
          await Promise.all([
            fetchFloodPredictions(),
            fetchRiskSummary(),
            fetchAlerts(),
            fetchNdrf(),
          ]);

        if (!isMounted) return;

        const stationData = predictionData?.stations || [];
        const alertResults = alertData?.alerts || [];
        const ndrfResults = ndrfData?.deployments || [];

        setStations(stationData);
        setRiskSummary(riskData);
        setAlerts(alertResults);
        setNdrfDeployments(ndrfResults);

        // Only select the highest-risk station
        // during the initial load.
        if (showLoading && stationData.length > 0) {
          const highestRiskStation = [...stationData].sort(
            (a, b) => b.probability - a.probability,
          )[0];

          setSelectedStation(highestRiskStation);
        }
      } catch (err) {
        console.error("Failed to load dashboard:", err);

        // Don't destroy already-loaded dashboard data
        // just because a refresh failed.
        if (isMounted && showLoading) {
          setError("Unable to connect to the flood prediction server.");
        }
      } finally {
        if (isMounted && showLoading) {
          setLoading(false);
        }
      }
    }

    // Initial load
    loadDashboard(true);

    // Refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      loadDashboard(false);
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-5 text-4xl animate-pulse">◌</div>

          <p className="text-xs tracking-[4px] text-white/60">
            INITIALIZING AKASHVANI
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            CONNECTING TO PREDICTION ENGINE
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !selectedStation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="w-[90%] max-w-md rounded-3xl border border-red-400/20 bg-white/5 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-2xl">
            ⚠
          </div>

          <h2 className="mt-5 text-xl font-medium">Unable to load dashboard</h2>

          <p className="mt-2 text-sm text-white/45">
            {error || "No station data available."}
          </p>

          <p className="mt-5 text-[10px] tracking-widest text-white/25">
            CHECK FASTAPI SERVER · PORT 8000
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     DERIVED DATA
  ======================================================= */

  const risk = getRisk(selectedStation.probability);
  const riskData = getRiskData(risk);

  const highRiskStations =
    riskSummary?.high_risk_count ??
    stations.filter((station) => station.probability >= 75).length;

  const totalPopulation =
    riskSummary?.total_population_monitored ??
    stations.reduce((total, station) => total + station.population, 0);

  const totalStations = riskSummary?.total_stations ?? stations.length;

  const moderateRiskStations =
    riskSummary?.moderate_risk_count ??
    stations.filter(
      (station) => station.probability >= 50 && station.probability < 75,
    ).length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "CRITICAL",
  );


  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white transition-all duration-1000"
      style={{
        backgroundImage: `url(${riskData.background})`,
      }}
    >
      <div className="min-h-screen bg-black/50">
        <div className="mx-auto w-[92%] max-w-7xl py-6">
          {/* =================================================
              HEADER
          ================================================= */}

          <DashboardHeader />

          {/* =================================================
              SYSTEM STATUS BAR
          ================================================= */}

          <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>

              <span className="text-[10px] tracking-[3px] text-white/70">
                AKASHVANI SYSTEM ONLINE
              </span>
            </div>

            <div className="flex flex-wrap gap-5 text-[9px] tracking-widest text-white/40">
              <span>
                STATIONS ·{" "}
                <strong className="text-white/70">{totalStations}</strong>
              </span>

              <span>
                ALERTS ·{" "}
                <strong className="text-white/70">{alerts.length}</strong>
              </span>

              <span>
                CRITICAL ·{" "}
                <strong className="text-red-300">
                  {criticalAlerts.length}
                </strong>
              </span>
            </div>
          </section>

          {/* =================================================
              ALERT BANNER
          ================================================= */}

          {alerts.length > 0 && (
            <section className="mt-5 overflow-hidden rounded-2xl border border-red-300/15 bg-red-500/10 backdrop-blur-xl">
              <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                    ⚠
                  </div>

                  <div>
                    <p className="text-[9px] tracking-[3px] text-red-200/60">
                      ACTIVE WEATHER ALERT
                    </p>

                    <p className="mt-1 text-sm text-white/80">
                      {alerts.length} monitored location
                      {alerts.length !== 1 ? "s" : ""} require attention.
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[9px] tracking-widest text-white/35">
                    HIGHEST PRIORITY
                  </p>

                  <p className="mt-1 text-sm font-medium text-red-100">
                    {alerts[0]?.city}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              HERO
          ================================================= */}

          <section className="grid items-center gap-10 py-10 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                <p className="text-[10px] tracking-[3px] text-white/50">
                  FLOOD EARLY WARNING
                </p>
              </div>

              <h2 className="mt-4 text-6xl font-semibold tracking-[-4px] sm:text-7xl md:text-8xl">
                {selectedStation.city}
              </h2>

              <p className="mt-3 text-xl text-white/50">
                {selectedStation.state}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] tracking-widest text-white/60 backdrop-blur-xl">
                  SATELLITE
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] tracking-widest text-white/60 backdrop-blur-xl">
                  RADAR
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] tracking-widest text-white/60 backdrop-blur-xl">
                  NWP
                </span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-wider backdrop-blur-xl ${riskData.badge}`}
              >
                <span>{riskData.icon}</span>
                {riskData.label}
              </div>

              <div className="mt-3 text-7xl font-semibold tracking-[-5px] sm:text-8xl">
                {selectedStation.probability.toFixed(1)}
                <span className="ml-1 text-3xl text-white/50">%</span>
              </div>

              <p className="text-xs text-white/50">
                Predicted flood probability
              </p>
            </div>
          </section>

          {/* =================================================
              STATS
          ================================================= */}

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon="🌧"
              title="Satellite Rainfall"
              value={`${selectedStation.rainfall} mm`}
            />

            <StatCard
              icon="◌"
              title="NWP Forecast · 3h"
              value={`${selectedStation.nwp} mm`}
            />

            <StatCard
              icon="🌊"
              title="Flood Probability"
              value={`${selectedStation.probability.toFixed(1)}%`}
            />

            <StatCard
              icon="⚡"
              title="Stations at Risk"
              value={`${highRiskStations}/${totalStations}`}
            />
          </section>

          {/* =================================================
              STATION MONITORING
          ================================================= */}

          <section className="mt-20">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] tracking-[3px] text-[#d2a565]">
                  MONITORING NETWORK
                </p>

                <h2 className="mt-1 text-2xl font-medium">
                  Station Monitoring
                </h2>

                <p className="mt-1 text-xs text-white/35">
                  AI-powered flood risk across monitored locations
                </p>
              </div>

              <div className="hidden items-center gap-2 text-[10px] tracking-widest text-white/50 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                SYSTEM ACTIVE
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <StationCard
                  key={station.city}
                  station={station}
                  selected={selectedStation.city === station.city}
                  onClick={() => setSelectedStation(station)}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              SELECTED LOCATION
          ================================================= */}

          <section className="mt-16">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-2xl">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[10px] tracking-[3px] text-[#d2a565]">
                    SELECTED LOCATION
                  </p>

                  <h2 className="mt-1 text-2xl font-medium">
                    {selectedStation.city}, {selectedStation.state}
                  </h2>
                </div>

                <div
                  className={`w-fit rounded-full border px-4 py-2 text-[10px] tracking-widest ${
                    selectedStation.priority === 1
                      ? "border-red-300/20 bg-red-500/25"
                      : selectedStation.priority === 2
                        ? "border-yellow-300/20 bg-yellow-500/25"
                        : "border-green-300/20 bg-green-500/25"
                  }`}
                >
                  PRIORITY {selectedStation.priority}
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <InfoBox
                  title="POPULATION IMPACT"
                  value={selectedStation.population.toLocaleString()}
                />

                <InfoBox
                  title="SATELLITE PRECIPITATION"
                  value={`${selectedStation.rainfall} mm`}
                />

                <InfoBox
                  title="NWP FORECAST · 3H"
                  value={`${selectedStation.nwp} mm`}
                />

                <InfoBox
                  title="FLOOD PROBABILITY"
                  value={`${selectedStation.probability.toFixed(2)}%`}
                />
              </div>
            </div>
          </section>

          {/* =================================================
              RISK OVERVIEW
          ================================================= */}

          <section className="mt-16">
            <div className="mb-5">
              <p className="text-[10px] tracking-[3px] text-white/40">
                RISK INTELLIGENCE
              </p>

              <h2 className="mt-1 text-2xl font-medium">
                Regional Risk Overview
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <RiskBox
                label="HIGH RISK"
                value={highRiskStations}
                description="Immediate attention"
                icon="⚠"
              />

              <RiskBox
                label="MODERATE RISK"
                value={moderateRiskStations}
                description="Close monitoring"
                icon="◐"
              />

              <RiskBox
                label="LOW RISK"
                value={
                  riskSummary?.low_risk_count ??
                  Math.max(
                    totalStations - highRiskStations - moderateRiskStations,
                    0,
                  )
                }
                description="Normal conditions"
                icon="✓"
              />
            </div>
          </section>

          {/* =================================================
              ALERTS
          ================================================= */}

          {alerts.length > 0 && (
            <section className="mt-20">
              <div className="mb-5">
                <p className="text-[10px] tracking-[3px] text-[#d2a565]">
                  EARLY WARNING NETWORK
                </p>

                <h2 className="mt-1 text-2xl font-medium">Active Alerts</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {alerts.map((alert, index) => (
                  <AlertCard key={`${alert.city}-${index}`} alert={alert} />
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              NDRF RESPONSE
          ================================================= */}

          <section className="mt-20">
            <div className="mb-5">
              <p className="text-[10px] tracking-[3px] text-[#d2a565]">
                RESPONSE COORDINATION
              </p>

              <h2 className="mt-1 text-2xl font-medium">
                NDRF Tactical Response
              </h2>

              <p className="mt-1 text-xs text-white/35">
                AI-assisted deployment recommendations
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ndrfDeployments.map((deployment, index) => (
                <NdrfCard
                  key={`${deployment.city}-${index}`}
                  deployment={deployment}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="my-20">
            <div className="grid gap-8 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-2xl md:grid-cols-3">
              <Summary
                title="TOTAL MONITORED IMPACT"
                value={totalPopulation.toLocaleString()}
                description="People across monitored stations"
              />

              <Summary
                title="HIGH-RISK LOCATIONS"
                value={highRiskStations}
                description="Immediate attention required"
              />

              <Summary
                title="ACTIVE ALERTS"
                value={alerts.length}
                description="Warnings currently generated"
              />
            </div>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="flex flex-col justify-between gap-3 border-t border-white/15 py-6 text-[9px] tracking-widest text-white/35 sm:flex-row">
            <span className="font-semibold tracking-[3px]">AKASHVANI</span>

            <span>AI-POWERED FLOOD EARLY WARNING SYSTEM</span>

            <span>MONITORING · {totalStations} STATIONS</span>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function InfoBox({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/15 p-4 transition hover:bg-black/25">
      <p className="text-[9px] tracking-wider text-white/40">{title}</p>

      <p className="mt-2 text-lg font-medium">{value}</p>
    </div>
  );
}

function RiskBox({ label, value, description, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">
      <div className="flex items-center justify-between">
        <p className="text-[9px] tracking-[2px] text-white/40">{label}</p>

        <span className="text-sm">{icon}</span>
      </div>

      <p className="mt-4 text-3xl font-medium">{value}</p>

      <p className="mt-1 text-[10px] text-white/35">{description}</p>
    </div>
  );
}

function AlertCard({ alert }) {
  const isCritical = alert.severity === "CRITICAL";

  return (
    <div
      className={`rounded-3xl border p-5 backdrop-blur-2xl ${
        isCritical
          ? "border-red-300/20 bg-red-500/10"
          : "border-yellow-300/15 bg-yellow-500/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium">{alert.city}</p>

          <p className="text-xs text-white/40">{alert.state}</p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-[8px] tracking-widest ${
            isCritical
              ? "border-red-300/20 bg-red-500/20 text-red-100"
              : "border-yellow-300/20 bg-yellow-500/20 text-yellow-100"
          }`}
        >
          {alert.severity}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[9px] tracking-widest text-white/35">
          FLOOD PROBABILITY
        </p>

        <p className="mt-1 text-3xl font-medium">
          {Number(alert.probability).toFixed(1)}%
        </p>
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-[10px] leading-relaxed text-white/55">
          {alert.message}
        </p>
      </div>
    </div>
  );
}

function NdrfCard({ deployment }) {
  const priority = deployment.priority;

  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">{deployment.city}</h3>

          <p className="text-xs text-white/40">{deployment.state}</p>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] ${
            priority === 1
              ? "bg-red-500/30"
              : priority === 2
                ? "bg-yellow-500/30"
                : "bg-green-500/30"
          }`}
        >
          P{priority}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <ResponseRow
          title="POPULATION IMPACT"
          value={deployment.population.toLocaleString()}
        />

        <ResponseRow title="ROAD STATUS" value={deployment.road_status} />

        <ResponseRow title="SAFE TRANSIT" value={deployment.corridor} />

        <ResponseRow title="NDRF EQUIPMENT" value={deployment.equipment} />
      </div>
    </div>
  );
}

function ResponseRow({ title, value }) {
  return (
    <div className="border-t border-white/10 pt-3">
      <div className="flex justify-between gap-4">
        <span className="text-[9px] text-white/40">{title}</span>

        <span className="max-w-[60%] text-right text-[10px] text-white/75">
          {value}
        </span>
      </div>
    </div>
  );
}

function Summary({ title, value, description }) {
  return (
    <div>
      <p className="text-[9px] tracking-[2px] text-white/40">{title}</p>

      <h2 className="mt-2 text-3xl font-medium">{value}</h2>

      <p className="mt-1 text-[10px] text-white/35">{description}</p>
    </div>
  );
}
