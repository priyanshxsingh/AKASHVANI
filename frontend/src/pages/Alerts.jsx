import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import RiskBackground from "../components/dashboard/RiskBackground";

import {
  fetchAlerts,
  fetchFloodPredictions,
} from "../services/api";

/* =========================================================
   HELPERS
========================================================= */

function getSeverityRank(severity) {
  if (severity === "CRITICAL") return 4;
  if (severity === "HIGH") return 3;
  if (severity === "MODERATE") return 2;
  return 1;
}

function getSeverityStyle(severity) {
  switch (severity) {
    case "CRITICAL":
      return {
        icon: "⚠",
        label: "CRITICAL",
        badge:
          "border-red-300/20 bg-red-500/15 text-red-100",
        dot: "bg-red-400",
        border: "border-red-400/20",
      };

    case "HIGH":
      return {
        icon: "!",
        label: "HIGH",
        badge:
          "border-orange-300/20 bg-orange-500/15 text-orange-100",
        dot: "bg-orange-400",
        border: "border-orange-400/20",
      };

    case "MODERATE":
      return {
        icon: "◐",
        label: "MODERATE",
        badge:
          "border-yellow-300/20 bg-yellow-500/15 text-yellow-100",
        dot: "bg-yellow-400",
        border: "border-yellow-400/20",
      };

    default:
      return {
        icon: "✓",
        label: "LOW",
        badge:
          "border-green-300/20 bg-green-500/15 text-green-100",
        dot: "bg-green-400",
        border: "border-green-400/20",
      };
  }
}

function formatProbability(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return `${number.toFixed(2)}%`;
}

function formatPopulation(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("en-IN");
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function AlertSummaryCard({
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl transition duration-300 hover:bg-white/[0.1]">
      <p className="text-[10px] uppercase tracking-[2px] text-white/40">
        {label}
      </p>

      <p className="mt-4 text-3xl font-light">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/35">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   ALERT CARD
========================================================= */

function AlertCard({ alert }) {
  const severity = String(
    alert.severity || "LOW"
  ).toUpperCase();

  const style = getSeverityStyle(severity);

  return (
    <div
      className={`rounded-3xl border ${style.border} bg-white/[0.07] p-6 backdrop-blur-xl transition duration-300 hover:bg-white/[0.1]`}
    >
      {/* TOP */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div className="flex items-start gap-4">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${style.badge} text-lg`}
          >
            {style.icon}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-lg font-medium">
                {alert.city}
              </h3>

              <span
                className={`rounded-full border px-3 py-1 text-[9px] uppercase tracking-[1.5px] ${style.badge}`}
              >
                {style.label}
              </span>

            </div>

            <p className="mt-1 text-xs text-white/35">
              {alert.state}
            </p>
          </div>

        </div>

        <div className="md:text-right">

          <p className="text-[9px] uppercase tracking-[2px] text-white/30">
            Flood Probability
          </p>

          <p className="mt-1 text-2xl font-light">
            {formatProbability(
              alert.probability
            )}
          </p>

        </div>

      </div>

      {/* MESSAGE */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-black/10 p-4">

        <p className="text-[9px] uppercase tracking-[2px] text-white/25">
          Alert Message
        </p>

        <p className="mt-2 text-sm leading-6 text-white/65">
          {alert.message ||
            "Flood risk conditions detected in the monitored region."}
        </p>

      </div>

      {/* BOTTOM DATA */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

        <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

          <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
            Population At Risk
          </p>

          <p className="mt-2 text-lg font-light">
            {formatPopulation(
              alert.population_at_risk
            )}
          </p>

          <p className="mt-1 text-[10px] text-white/25">
            people potentially affected
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

          <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
            Response Priority
          </p>

          <p className="mt-2 text-lg font-light">
            {severity === "CRITICAL"
              ? "Immediate"
              : severity === "HIGH"
                ? "Priority"
                : severity === "MODERATE"
                  ? "Monitor"
                  : "Routine"}
          </p>

          <p className="mt-1 text-[10px] text-white/25">
            operational response level
          </p>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [floodStations, setFloodStations] =
    useState([]);

  const [filter, setFilter] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* =======================================================
     FETCH ALERTS
  ======================================================= */

  useEffect(() => {
    async function loadAlerts() {
      try {
        setLoading(true);
        setError(null);

        const [
          alertData,
          floodData,
        ] = await Promise.all([
          fetchAlerts(),
          fetchFloodPredictions(),
        ]);

        console.log(
          "ALERT API:",
          alertData
        );

        console.log(
          "FLOOD API:",
          floodData
        );

        setAlerts(
          alertData?.alerts || []
        );

        setFloodStations(
          floodData?.stations || []
        );
      } catch (err) {
        console.error(
          "Failed to load alerts:",
          err
        );

        setError(
          "Unable to connect to the alert service."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);

  /* =======================================================
     SORT ALERTS
  ======================================================= */

  const sortedAlerts = useMemo(() => {
    return [...alerts].sort(
      (a, b) =>
        getSeverityRank(
          String(
            b.severity || "LOW"
          ).toUpperCase()
        ) -
        getSeverityRank(
          String(
            a.severity || "LOW"
          ).toUpperCase()
        )
    );
  }, [alerts]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts = useMemo(() => {
    return {
      total: alerts.length,

      critical: alerts.filter(
        (alert) =>
          String(
            alert.severity
          ).toUpperCase() === "CRITICAL"
      ).length,

      high: alerts.filter(
        (alert) =>
          String(
            alert.severity
          ).toUpperCase() === "HIGH"
      ).length,

      moderate: alerts.filter(
        (alert) =>
          String(
            alert.severity
          ).toUpperCase() === "MODERATE"
      ).length,
    };
  }, [alerts]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredAlerts = useMemo(() => {
    if (filter === "ALL") {
      return sortedAlerts;
    }

    return sortedAlerts.filter(
      (alert) =>
        String(
          alert.severity || ""
        ).toUpperCase() === filter
    );
  }, [
    sortedAlerts,
    filter,
  ]);

  /* =======================================================
     HIGHEST RISK
  ======================================================= */

  const highestRiskStation =
    [...floodStations].sort(
      (a, b) =>
        Number(
          b.probability || 0
        ) -
        Number(
          a.probability || 0
        )
    )[0];

  const backgroundProbability =
    Number(
      highestRiskStation?.probability
    ) || 0;

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        <div className="text-center">

          <div className="mb-5 animate-pulse text-4xl">
            ◌
          </div>

          <p className="text-xs tracking-[4px] text-white/60">
            INITIALIZING ALERT CENTER
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            SCANNING REGIONAL RISK SIGNALS
          </p>

        </div>

      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        <div className="w-[90%] max-w-md rounded-3xl border border-red-400/20 bg-white/5 p-8 text-center backdrop-blur-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-2xl">
            ⚠
          </div>

          <h2 className="mt-5 text-xl font-medium">
            Alert center unavailable
          </h2>

          <p className="mt-2 text-sm text-white/45">
            {error}
          </p>

          <p className="mt-5 text-[10px] tracking-widest text-white/25">
            CHECK FASTAPI SERVER · PORT 8000
          </p>

        </div>

      </div>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <RiskBackground
      probability={backgroundProbability}
    >

      <div className="mx-auto w-[92%] max-w-7xl py-6">

        <DashboardHeader />

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mt-10">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />

                <p className="text-[10px] uppercase tracking-[3px] text-[#d2a565]">
                  Emergency Monitoring
                </p>

              </div>

              <h1 className="text-3xl font-light tracking-tight md:text-5xl">
                Alert Center
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Regional flood alerts generated from
                the current prediction and risk
                assessment pipeline.
              </p>

            </div>

            <div className="rounded-full border border-[#d2a565]/20 bg-[#d2a565]/10 px-4 py-2 backdrop-blur-xl">

              <span className="text-[9px] uppercase tracking-[2px] text-[#d2a565]">
                {counts.total} active alerts
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <AlertSummaryCard
            label="Total Alerts"
            value={counts.total}
            description="Current regional alerts"
          />

          <AlertSummaryCard
            label="Critical"
            value={counts.critical}
            description="Immediate attention required"
          />

          <AlertSummaryCard
            label="High"
            value={counts.high}
            description="Priority response recommended"
          />

          <AlertSummaryCard
            label="Moderate"
            value={counts.moderate}
            description="Continuous monitoring"
          />

        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <section className="mt-8">

          <div className="flex flex-wrap gap-2">

            {[
              "ALL",
              "CRITICAL",
              "HIGH",
              "MODERATE",
            ].map((level) => {

              const active =
                filter === level;

              return (
                <button
                  key={level}
                  onClick={() =>
                    setFilter(level)
                  }
                  className={`rounded-full border px-4 py-2 text-[9px] uppercase tracking-[1.5px] transition ${
                    active
                      ? "border-[#d2a565]/50 bg-[#d2a565]/20 text-[#d2a565]"
                      : "border-white/10 bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
                  }`}
                >
                  {level}
                </button>
              );
            })}

          </div>

        </section>

        {/* =================================================
            ALERT LIST
        ================================================= */}

        <section className="mt-6">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[3px] text-white/30">
                Active Threat Signals
              </p>

              <h2 className="mt-2 text-xl font-light">
                Regional Alerts
              </h2>

            </div>

            <p className="text-[10px] text-white/25">
              {filteredAlerts.length} shown
            </p>

          </div>

          {filteredAlerts.length > 0 ? (

            <div className="space-y-4">

              {filteredAlerts.map(
                (alert, index) => (
                  <AlertCard
                    key={`${alert.city}-${alert.severity}-${index}`}
                    alert={alert}
                  />
                )
              )}

            </div>

          ) : (

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-green-300/10 bg-green-500/10 text-xl">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-light">
                No alerts in this category
              </h3>

              <p className="mt-2 text-xs text-white/35">
                No matching regional threat signals
                are currently available.
              </p>

            </div>

          )}

        </section>

        {/* =================================================
            OPERATIONAL NOTE
        ================================================= */}

        <section className="mt-8">

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Operational Interpretation
            </p>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

              <div>

                <p className="text-sm font-medium">
                  Critical
                </p>

                <p className="mt-2 text-xs leading-6 text-white/35">
                  Highest-priority conditions requiring
                  immediate attention from response
                  authorities.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  High
                </p>

                <p className="mt-2 text-xs leading-6 text-white/35">
                  Significant predicted flood probability
                  requiring priority monitoring and
                  preparedness.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Moderate
                </p>

                <p className="mt-2 text-xs leading-6 text-white/35">
                  Conditions requiring continued
                  observation as the situation evolves.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="py-10 text-center">

          <p className="text-[9px] uppercase tracking-[3px] text-white/20">
            AKASHVANI · ALERT CENTER
          </p>

        </div>

      </div>

    </RiskBackground>
  );
}