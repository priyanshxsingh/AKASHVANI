import { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StationCard from "../components/dashboard/StationCard";
import StatCard from "../components/dashboard/StatCard";

import RiskBackground, {
  getRisk,
  getRiskData,
} from "../components/dashboard/RiskBackground";

import { fetchFloodPredictions } from "../services/api";

export default function RiskAnalysis() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] =
    useState(null);

  const [filter, setFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRiskData() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFloodPredictions();

        const stationData = data?.stations || [];

        setStations(stationData);

        if (stationData.length > 0) {
          const highestRiskStation = [...stationData].sort(
            (a, b) => b.probability - a.probability,
          )[0];

          setSelectedStation(highestRiskStation);
        }
      } catch (err) {
        console.error(
          "Failed to load risk analysis:",
          err,
        );

        setError(
          "Unable to connect to the flood prediction server.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadRiskData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-5 animate-pulse text-4xl">
            ◌
          </div>

          <p className="text-xs tracking-[4px] text-white/60">
            INITIALIZING RISK ANALYSIS
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            ANALYZING MONITORED LOCATIONS
          </p>
        </div>
      </div>
    );
  }

  if (error || !selectedStation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="w-[90%] max-w-md rounded-3xl border border-red-400/20 bg-white/5 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-2xl">
            ⚠
          </div>

          <h2 className="mt-5 text-xl font-medium">
            Risk analysis unavailable
          </h2>

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

  /*
   * Highest-risk station controls the page background.
   * This keeps Risk Analysis visually consistent
   * with the main Dashboard.
   */
  const highestRiskStation = [...stations].sort(
    (a, b) => b.probability - a.probability,
  )[0];

  const risk = getRisk(
    highestRiskStation.probability,
  );

  const riskData = getRiskData(risk);

  const highRiskStations = stations.filter(
    (station) => station.probability >= 75,
  );

  const moderateRiskStations = stations.filter(
    (station) =>
      station.probability >= 50 &&
      station.probability < 75,
  );

  const lowRiskStations = stations.filter(
    (station) => station.probability < 50,
  );

  const filteredStations =
    filter === "HIGH"
      ? highRiskStations
      : filter === "MODERATE"
        ? moderateRiskStations
        : filter === "LOW"
          ? lowRiskStations
          : stations;

  const averageProbability =
    stations.length > 0
      ? stations.reduce(
          (total, station) =>
            total + Number(station.probability || 0),
          0,
        ) / stations.length
      : 0;

  return (
    <RiskBackground
      probability={highestRiskStation.probability}
    >
      <div className="mx-auto w-[92%] max-w-7xl py-6">
        {/* =================================================
            HEADER
        ================================================= */}

        <DashboardHeader />

        {/* =================================================
            PAGE INTRO
        ================================================= */}

        <section className="py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

              <p className="text-[10px] tracking-[3px] text-[#d2a565]">
                RISK INTELLIGENCE
              </p>
            </div>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-3px] sm:text-6xl md:text-7xl">
              Risk Analysis
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">
              AI-powered flood probability assessment
              across the monitored station network.
            </p>
          </div>
        </section>

        {/* =================================================
            CURRENT RISK
        ================================================= */}

        <section className="grid items-center gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-2xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <p className="text-[9px] tracking-[3px] text-white/40">
                  HIGHEST RISK LOCATION
                </p>

                <h2 className="mt-3 text-4xl font-medium tracking-[-2px]">
                  {highestRiskStation.city}
                </h2>

                <p className="mt-1 text-sm text-white/45">
                  {highestRiskStation.state}
                </p>
              </div>

              <div
                className={`w-fit rounded-full border px-4 py-2 text-[10px] tracking-widest backdrop-blur-xl ${riskData.badge}`}
              >
                <span className="mr-2">
                  {riskData.icon}
                </span>

                {riskData.label}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-end gap-2">
                <span className="text-7xl font-semibold tracking-[-5px] sm:text-8xl">
                  {Number(
                    highestRiskStation.probability,
                  ).toFixed(1)}
                </span>

                <span className="mb-3 text-3xl text-white/40">
                  %
                </span>
              </div>

              <p className="mt-1 text-xs text-white/40">
                Predicted flood probability
              </p>
            </div>

            {/* Probability bar */}

            <div className="mt-7">
              <div className="mb-2 flex justify-between text-[9px] tracking-widest text-white/35">
                <span>RISK LEVEL</span>

                <span>
                  {Number(
                    highestRiskStation.probability,
                  ).toFixed(1)}
                  %
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    risk === "high"
                      ? "bg-red-400"
                      : risk === "moderate"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                  }`}
                  style={{
                    width: `${Math.min(
                      highestRiskStation.probability,
                      100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <StatCard
              icon="⚠"
              title="High Risk"
              value={highRiskStations.length}
            />

            <StatCard
              icon="◐"
              title="Moderate Risk"
              value={moderateRiskStations.length}
            />

            <StatCard
              icon="✓"
              title="Low Risk"
              value={lowRiskStations.length}
            />
          </div>
        </section>

        {/* =================================================
            NETWORK METRICS
        ================================================= */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="MONITORED STATIONS"
            value={stations.length}
            description="Active prediction locations"
          />

          <MetricCard
            label="AVERAGE PROBABILITY"
            value={`${averageProbability.toFixed(1)}%`}
            description="Across monitored network"
          />

          <MetricCard
            label="CRITICAL LOCATIONS"
            value={highRiskStations.length}
            description="Probability ≥ 75%"
          />

          <MetricCard
            label="MONITORED POPULATION"
            value={stations
              .reduce(
                (total, station) =>
                  total +
                  Number(station.population || 0),
                0,
              )
              .toLocaleString()}
            description="People across stations"
          />
        </section>

        {/* =================================================
            RISK DISTRIBUTION
        ================================================= */}

        <section className="mt-16">
          <div className="mb-5">
            <p className="text-[10px] tracking-[3px] text-white/40">
              NETWORK DISTRIBUTION
            </p>

            <h2 className="mt-1 text-2xl font-medium">
              Regional Risk Distribution
            </h2>

            <p className="mt-1 text-xs text-white/35">
              Classification based on predicted flood
              probability
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <DistributionCard
              title="HIGH RISK"
              count={highRiskStations.length}
              total={stations.length}
              description="Immediate attention required"
              type="high"
            />

            <DistributionCard
              title="MODERATE RISK"
              count={moderateRiskStations.length}
              total={stations.length}
              description="Close monitoring required"
              type="moderate"
            />

            <DistributionCard
              title="LOW RISK"
              count={lowRiskStations.length}
              total={stations.length}
              description="Normal conditions"
              type="low"
            />
          </div>
        </section>

        {/* =================================================
            FILTER
        ================================================= */}

        <section className="mt-16">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] tracking-[3px] text-white/40">
                STATION NETWORK
              </p>

              <h2 className="mt-1 text-2xl font-medium">
                Risk by Location
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {["ALL", "HIGH", "MODERATE", "LOW"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setFilter(option)
                    }
                    className={`rounded-full border px-4 py-2 text-[9px] tracking-widest transition ${
                      filter === option
                        ? "border-white/30 bg-white/20 text-white"
                        : "border-white/10 bg-black/20 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStations.map((station) => (
              <StationCard
                key={station.city}
                station={station}
                selected={
                  selectedStation.city ===
                  station.city
                }
                onClick={() =>
                  setSelectedStation(station)
                }
              />
            ))}
          </div>

          {filteredStations.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
              <p className="text-sm text-white/40">
                No stations match this risk category.
              </p>
            </div>
          )}
        </section>

        {/* =================================================
            SELECTED STATION
        ================================================= */}

        <section className="mt-16">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-2xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] tracking-[3px] text-white/40">
                  SELECTED ANALYSIS
                </p>

                <h2 className="mt-1 text-2xl font-medium">
                  {selectedStation.city},{" "}
                  {selectedStation.state}
                </h2>
              </div>

              <RiskBadge
                probability={
                  selectedStation.probability
                }
              />
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBox
                title="FLOOD PROBABILITY"
                value={`${Number(
                  selectedStation.probability,
                ).toFixed(2)}%`}
              />

              <InfoBox
                title="SATELLITE RAINFALL"
                value={`${selectedStation.rainfall} mm`}
              />

              <InfoBox
                title="NWP FORECAST · 3H"
                value={`${selectedStation.nwp} mm`}
              />

              <InfoBox
                title="POPULATION IMPACT"
                value={Number(
                  selectedStation.population,
                ).toLocaleString()}
              />
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="mt-20 flex flex-col justify-between gap-3 border-t border-white/15 py-6 text-[9px] tracking-widest text-white/35 sm:flex-row">
          <span className="font-semibold tracking-[3px]">
            AKASHVANI
          </span>

          <span>
            RISK INTELLIGENCE · FLOOD EARLY WARNING
          </span>

          <span>
            MONITORING · {stations.length} STATIONS
          </span>
        </footer>
      </div>
    </RiskBackground>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function MetricCard({
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">
      <p className="text-[9px] tracking-[2px] text-white/40">
        {label}
      </p>

      <p className="mt-3 text-3xl font-medium">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-white/35">
        {description}
      </p>
    </div>
  );
}

function DistributionCard({
  title,
  count,
  total,
  description,
  type,
}) {
  const percentage =
    total > 0 ? (count / total) * 100 : 0;

  const styles = {
    high: {
      border: "border-red-300/20",
      background: "bg-red-500/10",
      text: "text-red-100",
      bar: "bg-red-400",
    },

    moderate: {
      border: "border-yellow-300/20",
      background: "bg-yellow-500/10",
      text: "text-yellow-100",
      bar: "bg-yellow-400",
    },

    low: {
      border: "border-green-300/20",
      background: "bg-green-500/10",
      text: "text-green-100",
      bar: "bg-green-400",
    },
  };

  const style = styles[type];

  return (
    <div
      className={`rounded-3xl border p-6 backdrop-blur-2xl ${style.border} ${style.background}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[9px] tracking-[2px] text-white/45">
          {title}
        </p>

        <span className={`text-sm ${style.text}`}>
          {count}
        </span>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-4xl font-medium">
          {percentage.toFixed(0)}
        </span>

        <span className="mb-1 text-sm text-white/35">
          %
        </span>
      </div>

      <p className="mt-1 text-[10px] text-white/35">
        {description}
      </p>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-black/25">
        <div
          className={`h-full rounded-full ${style.bar}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function RiskBadge({ probability }) {
  const risk = getRisk(probability);
  const data = getRiskData(risk);

  return (
    <div
      className={`w-fit rounded-full border px-4 py-2 text-[10px] tracking-widest backdrop-blur-xl ${data.badge}`}
    >
      <span className="mr-2">{data.icon}</span>
      {data.label}
    </div>
  );
}

function InfoBox({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/15 p-4 transition hover:bg-black/25">
      <p className="text-[9px] tracking-wider text-white/40">
        {title}
      </p>

      <p className="mt-2 text-lg font-medium">
        {value}
      </p>
    </div>
  );
}