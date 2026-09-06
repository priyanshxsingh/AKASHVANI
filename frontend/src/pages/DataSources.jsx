import { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import RiskBackground from "../components/dashboard/RiskBackground";

import {
  fetchLiveData,
  fetchFloodPredictions,
} from "../services/api";

/* =========================================================
   SOURCE CONFIG
========================================================= */

const sources = [
  {
    id: "satellite",
    number: "01",
    title: "Satellite",
    subtitle: "Precipitation & atmospheric observation",
    description:
      "Satellite-derived observations provide precipitation and atmospheric signals used to understand the spatial distribution of heavy rainfall.",
    data: [
      "Satellite Precipitation",
      "Cloud Cover",
      "Cloud Top Temperature",
      "Land Surface Temperature",
    ],
  },
  {
    id: "radar",
    number: "02",
    title: "Radar",
    subtitle: "Storm structure & precipitation signals",
    description:
      "Radar information contributes precipitation intensity and storm structure signals to the integrated prediction pipeline.",
    data: [
      "Radar Reflectivity",
      "Radar Rainfall Rate",
      "Storm Movement",
      "Radar Echo Intensity",
    ],
  },
  {
    id: "nwp",
    number: "03",
    title: "NWP",
    subtitle: "Numerical weather prediction",
    description:
      "Numerical weather prediction information provides forecast signals for upcoming rainfall and atmospheric conditions.",
    data: [
      "1h Rainfall Forecast",
      "3h Rainfall Forecast",
      "6h Rainfall Forecast",
      "Temperature",
      "Wind",
      "Pressure",
    ],
  },
  {
    id: "fusion",
    number: "04",
    title: "Fusion Engine",
    subtitle: "Multisource data integration",
    description:
      "The fusion layer combines the available weather signals into a unified station-level feature set for the prediction system.",
    data: [
      "Spatial station data",
      "Weather observations",
      "Forecast variables",
      "Model feature alignment",
    ],
  },
  {
    id: "ai",
    number: "05",
    title: "AI / ML Model",
    subtitle: "Flood probability prediction",
    description:
      "The machine-learning model evaluates the integrated feature set and produces a predicted flood probability for monitored stations.",
    data: [
      "16 model input features",
      "Flood probability",
      "Station-level prediction",
      "Risk classification",
    ],
  },
  {
    id: "response",
    number: "06",
    title: "Risk & Response",
    subtitle: "Operational decision support",
    description:
      "Prediction outputs are transformed into risk levels, alerts and response priorities for operational monitoring.",
    data: [
      "Low / Moderate / High risk",
      "Regional alerts",
      "Population exposure",
      "NDRF response priority",
    ],
  },
];

/* =========================================================
   SOURCE CARD
========================================================= */

function SourceCard({ source }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition duration-300 hover:bg-white/[0.1]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
            <span className="text-[10px] tracking-[1px] text-white/60">
              {source.number}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              {source.title}
            </h3>

            <p className="mt-1 text-xs text-white/35">
              {source.subtitle}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[8px] uppercase tracking-[1.5px] text-white/35">
          Integrated
        </span>
      </div>

      <p className="mt-6 text-sm leading-6 text-white/45">
        {source.description}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {source.data.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/5 bg-black/10 px-3 py-2"
          >
            <p className="text-[10px] text-white/50">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   LIVE DATA CARD
========================================================= */

function LiveDataCard({ data }) {
  if (!data) return null;

  const displayValue =
    typeof data === "string"
      ? data
      : JSON.stringify(data);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
      <p className="text-[10px] uppercase tracking-[3px] text-white/30">
        API Connection
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

        <p className="text-sm text-white/70">
          Live data endpoint connected
        </p>
      </div>

      <p className="mt-4 break-all text-[10px] leading-5 text-white/25">
        {displayValue}
      </p>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function DataSources() {
  const [liveData, setLiveData] = useState(null);
  const [stations, setStations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    async function loadDataSources() {
      try {
        setLoading(true);
        setError(null);

        const [liveResult, floodResult] =
          await Promise.all([
            fetchLiveData(),
            fetchFloodPredictions(),
          ]);

        console.log(
          "LIVE DATA API:",
          liveResult
        );

        console.log(
          "FLOOD API:",
          floodResult
        );

        setLiveData(liveResult);
        setStations(
          floodResult?.stations || []
        );
      } catch (err) {
        console.error(
          "Failed to load data sources:",
          err
        );

        setError(
          "Unable to connect to the data services."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDataSources();
  }, []);

  /* =======================================================
     HIGHEST RISK
  ======================================================= */

  const highestRiskStation =
    [...stations].sort(
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
            INITIALIZING DATA CENTER
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            CONNECTING TO WEATHER DATA PIPELINE
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
            Data center unavailable
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
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

              <p className="text-[10px] uppercase tracking-[3px] text-white/40">
                Integrated Weather Intelligence
              </p>
            </div>

            <h1 className="text-3xl font-light tracking-tight md:text-5xl">
              Data Sources
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
              AKASHVANI integrates multiple weather
              and environmental signals into a
              unified flood-risk prediction pipeline.
            </p>
          </div>
        </section>

        {/* =================================================
            PIPELINE
        ================================================= */}

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Intelligence Pipeline
            </p>

            <h2 className="mt-2 text-xl font-light">
              From Observation to Response
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
            <div className="flex min-w-[850px] items-center justify-between gap-3">
              {[
                "Satellite",
                "Radar",
                "NWP",
                "Fusion",
                "AI / ML",
                "Response",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex flex-1 items-center gap-3"
                >
                  <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-center">
                    <p className="text-[10px] uppercase tracking-[1.5px] text-white/60">
                      {item}
                    </p>
                  </div>

                  {index < 5 && (
                    <span className="text-white/20">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            SOURCE CARDS
        ================================================= */}

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Source Architecture
            </p>

            <h2 className="mt-2 text-xl font-light">
              Multisource Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {sources.map((source) => (
              <SourceCard
                key={source.id}
                source={source}
              />
            ))}
          </div>
        </section>

        {/* =================================================
            MONITORED DATA
        ================================================= */}

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Current Monitoring
            </p>

            <h2 className="mt-2 text-xl font-light">
              Data Service Status
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <LiveDataCard data={liveData} />

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[3px] text-white/30">
                Prediction Network
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <p className="text-sm text-white/70">
                  Prediction service operational
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                  <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
                    Stations
                  </p>

                  <p className="mt-2 text-xl font-light">
                    {stations.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                  <p className="text-[9px] uppercase tracking-[1.5px] text-white/25">
                    Model Inputs
                  </p>

                  <p className="mt-2 text-xl font-light">
                    16
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            MODEL INFORMATION
        ================================================= */}

        <section className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Prediction Layer
            </p>

            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium">
                  Multisource Features
                </p>

                <p className="mt-2 text-xs leading-6 text-white/35">
                  Weather and environmental signals
                  are aligned into the feature structure
                  expected by the prediction model.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Flood Probability
                </p>

                <p className="mt-2 text-xs leading-6 text-white/35">
                  The AI/ML layer produces a predicted
                  flood probability for each monitored
                  station.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Risk Classification
                </p>

                <p className="mt-2 text-xs leading-6 text-white/35">
                  Prediction outputs support risk
                  categorization, alerts and response
                  prioritization.
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
            AKASHVANI · DATA SOURCES
          </p>
        </div>
      </div>
    </RiskBackground>
  );
}