import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import RiskBackground from "../components/dashboard/RiskBackground";

import {
  fetchNdrf,
  fetchFloodPredictions,
} from "../services/api";

/* =========================================================
   HELPERS
========================================================= */

function getPriorityLabel(priority) {
  const value = Number(priority);

  if (value === 1) return "CRITICAL";
  if (value === 2) return "HIGH";
  if (value === 3) return "MODERATE";

  return "ROUTINE";
}

function getPriorityStyle(priority) {
  const value = Number(priority);

  if (value === 1) {
    return {
      badge:
        "border-red-300/20 bg-red-500/15 text-red-100",
      dot: "bg-red-400",
    };
  }

  if (value === 2) {
    return {
      badge:
        "border-orange-300/20 bg-orange-500/15 text-orange-100",
      dot: "bg-orange-400",
    };
  }

  if (value === 3) {
    return {
      badge:
        "border-yellow-300/20 bg-yellow-500/15 text-yellow-100",
      dot: "bg-yellow-400",
    };
  }

  return {
    badge:
      "border-green-300/20 bg-green-500/15 text-green-100",
    dot: "bg-green-400",
  };
}

function getRoadStatusStyle(status) {
  const value = String(status || "").toLowerCase();

  if (
    value.includes("blocked") ||
    value.includes("closed")
  ) {
    return "text-red-200";
  }

  if (
    value.includes("partial") ||
    value.includes("slow")
  ) {
    return "text-yellow-200";
  }

  return "text-green-200";
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

function ResponseStat({
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
   DEPLOYMENT CARD
========================================================= */

function DeploymentCard({ deployment }) {
  const priority =
    Number(deployment.priority) || 99;

  const priorityLabel =
    getPriorityLabel(priority);

  const priorityStyle =
    getPriorityStyle(priority);

  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition duration-300 hover:bg-white/[0.1]"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">

            <span
              className={`h-2.5 w-2.5 rounded-full ${priorityStyle.dot}`}
            />

          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-lg font-medium">
                {deployment.city}
              </h3>

              <span
                className={`rounded-full border px-3 py-1 text-[9px] uppercase tracking-[1.5px] ${priorityStyle.badge}`}
              >
                {priorityLabel}
              </span>

            </div>

            <p className="mt-1 text-xs text-white/35">
              {deployment.state}
            </p>

          </div>

        </div>

        <div className="md:text-right">

          <p className="text-[9px] uppercase tracking-[2px] text-white/30">
            Deployment Priority
          </p>

          <p className="mt-1 text-2xl font-light">
            P{priority}
          </p>

        </div>

      </div>

      {/* DEPLOYMENT DETAILS */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

        <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

          <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
            Population
          </p>

          <p className="mt-2 text-lg font-light">
            {formatPopulation(
              deployment.population
            )}
          </p>

          <p className="mt-1 text-[10px] text-white/25">
            population in monitored area
          </p>

        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">

          <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
            Road Status
          </p>

          <p
            className={`mt-2 text-sm font-medium ${getRoadStatusStyle(
              deployment.road_status
            )}`}
          >
            {deployment.road_status || "Unknown"}
          </p>

          <p className="mt-1 text-[10px] text-white/25">
            current access condition
          </p>

        </div>

      </div>

      {/* CORRIDOR */}
      <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.04] p-4">

        <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
          Priority Corridor
        </p>

        <p className="mt-2 text-sm text-white/70">
          {deployment.corridor || "Not specified"}
        </p>

      </div>

      {/* EQUIPMENT */}
      <div className="mt-3 rounded-2xl border border-white/5 bg-white/[0.04] p-4">

        <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
          Recommended Equipment
        </p>

        <p className="mt-2 text-sm leading-6 text-white/65">
          {deployment.equipment || "Not specified"}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function NdrfResponse() {
  const [deployments, setDeployments] =
    useState([]);

  const [floodStations, setFloodStations] =
    useState([]);

  const [filter, setFilter] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    async function loadResponseData() {
      try {
        setLoading(true);
        setError(null);

        const [
          ndrfData,
          floodData,
        ] = await Promise.all([
          fetchNdrf(),
          fetchFloodPredictions(),
        ]);

        console.log(
          "NDRF API:",
          ndrfData
        );

        console.log(
          "FLOOD API:",
          floodData
        );

        setDeployments(
          ndrfData?.deployments || []
        );

        setFloodStations(
          floodData?.stations || []
        );
      } catch (err) {
        console.error(
          "Failed to load NDRF response:",
          err
        );

        setError(
          "Unable to connect to the NDRF response service."
        );
      } finally {
        setLoading(false);
      }
    }

    loadResponseData();
  }, []);

  /* =======================================================
     SORT DEPLOYMENTS
  ======================================================= */

  const sortedDeployments = useMemo(() => {
    return [...deployments].sort(
      (a, b) =>
        Number(a.priority || 99) -
        Number(b.priority || 99)
    );
  }, [deployments]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts = useMemo(() => {
    const critical =
      deployments.filter(
        (deployment) =>
          Number(deployment.priority) === 1
      ).length;

    const high =
      deployments.filter(
        (deployment) =>
          Number(deployment.priority) === 2
      ).length;

    const moderate =
      deployments.filter(
        (deployment) =>
          Number(deployment.priority) === 3
      ).length;

    const population =
      deployments.reduce(
        (total, deployment) =>
          total +
          (Number(deployment.population) || 0),
        0
      );

    return {
      total: deployments.length,
      critical,
      high,
      moderate,
      population,
    };
  }, [deployments]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredDeployments =
    useMemo(() => {
      if (filter === "ALL") {
        return sortedDeployments;
      }

      const priorityMap = {
        CRITICAL: 1,
        HIGH: 2,
        MODERATE: 3,
      };

      return sortedDeployments.filter(
        (deployment) =>
          Number(deployment.priority) ===
          priorityMap[filter]
      );
    }, [
      sortedDeployments,
      filter,
    ]);

  /* =======================================================
     HIGHEST FLOOD RISK
  ======================================================= */

  const highestRiskStation =
    [...floodStations].sort(
      (a, b) =>
        Number(b.probability || 0) -
        Number(a.probability || 0)
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
            INITIALIZING RESPONSE CENTER
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            PREPARING NDRF DEPLOYMENT DATA
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
            Response center unavailable
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
     MAIN
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

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                <p className="text-[10px] uppercase tracking-[3px] text-white/40">
                  Emergency Operations
                </p>

              </div>

              <h1 className="text-3xl font-light tracking-tight md:text-5xl">
                NDRF Response
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Operational deployment priorities
                derived from monitored flood risk,
                population exposure and regional
                access conditions.
              </p>

            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">

              <span className="text-[9px] uppercase tracking-[2px] text-white/45">
                {counts.total} deployment zones
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <ResponseStat
            label="Deployment Zones"
            value={counts.total}
            description="Monitored response locations"
          />

          <ResponseStat
            label="Critical"
            value={counts.critical}
            description="Highest operational priority"
          />

          <ResponseStat
            label="High Priority"
            value={counts.high}
            description="Priority deployment required"
          />

          <ResponseStat
            label="Population"
            value={counts.population.toLocaleString(
              "en-IN"
            )}
            description="Population across deployment zones"
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
                      ? "border-white/20 bg-white/15 text-white"
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
            DEPLOYMENTS
        ================================================= */}

        <section className="mt-6">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[3px] text-white/30">
                Tactical Deployment
              </p>

              <h2 className="mt-2 text-xl font-light">
                Response Zones
              </h2>

            </div>

            <p className="text-[10px] text-white/25">
              {filteredDeployments.length} shown
            </p>

          </div>

          {filteredDeployments.length > 0 ? (

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

              {filteredDeployments.map(
                (deployment, index) => (
                  <DeploymentCard
                    key={`${deployment.city}-${index}`}
                    deployment={deployment}
                  />
                )
              )}

            </div>

          ) : (

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-12 text-center backdrop-blur-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xl">
                —
              </div>

              <h3 className="mt-5 text-lg font-light">
                No deployment zones
              </h3>

              <p className="mt-2 text-xs text-white/35">
                No response locations match the
                selected priority.
              </p>

            </div>

          )}

        </section>

        {/* =================================================
            RESPONSE PROTOCOL
        ================================================= */}

        <section className="mt-8">

          <div className="mb-4">

            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Operational Protocol
            </p>

            <h2 className="mt-2 text-xl font-light">
              Priority Interpretation
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="rounded-3xl border border-red-300/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-red-400" />

                <h3 className="text-sm font-medium">
                  P1 · Critical
                </h3>

              </div>

              <p className="mt-4 text-xs leading-6 text-white/40">
                Highest operational priority.
                Immediate response preparedness
                should be considered for the affected
                zone.
              </p>

            </div>

            <div className="rounded-3xl border border-orange-300/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-orange-400" />

                <h3 className="text-sm font-medium">
                  P2 · High
                </h3>

              </div>

              <p className="mt-4 text-xs leading-6 text-white/40">
                Priority deployment planning and
                continuous monitoring are recommended
                for the region.
              </p>

            </div>

            <div className="rounded-3xl border border-yellow-300/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-yellow-400" />

                <h3 className="text-sm font-medium">
                  P3 · Moderate
                </h3>

              </div>

              <p className="mt-4 text-xs leading-6 text-white/40">
                Maintain situational awareness and
                monitor changing weather and flood
                conditions.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            SYSTEM NOTE
        ================================================= */}

        <section className="mt-8">

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[3px] text-white/30">
                  Response Intelligence
                </p>

                <p className="mt-3 max-w-2xl text-xs leading-6 text-white/40">
                  Deployment information shown here
                  is generated from the current
                  AKASHVANI response dataset and
                  prediction pipeline.
                </p>

              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">

                <span className="text-[9px] uppercase tracking-[1.5px] text-white/40">
                  Operational View
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="py-10 text-center">

          <p className="text-[9px] uppercase tracking-[3px] text-white/20">
            AKASHVANI · NDRF RESPONSE
          </p>

        </div>

      </div>

    </RiskBackground>
  );
}