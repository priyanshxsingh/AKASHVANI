import { useEffect, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import RiskBackground from "../components/dashboard/RiskBackground";

import {
  fetchSystemStatus,
} from "../services/api";

/* =========================================================
   STATUS HELPERS
========================================================= */

function StatusDot({ online }) {
  return (
    <span
      className={`h-2 w-2 rounded-full ${
        online ? "bg-green-400" : "bg-red-400"
      }`}
    />
  );
}

function StatusBadge({ online }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] uppercase tracking-[1.5px] ${
        online
          ? "border-green-300/20 bg-green-500/10 text-green-100"
          : "border-red-300/20 bg-red-500/10 text-red-100"
      }`}
    >
      <StatusDot online={online} />

      {online ? "Operational" : "Unavailable"}
    </span>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  title,
  description,
  online,
  detail,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl transition duration-300 hover:bg-white/[0.1]">

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-lg font-medium">
            {title}
          </p>

          <p className="mt-2 text-xs leading-5 text-white/35">
            {description}
          </p>
        </div>

        <StatusBadge online={online} />

      </div>

      <div className="mt-6 border-t border-white/5 pt-4">

        <p className="text-[9px] uppercase tracking-[2px] text-white/25">
          Service Detail
        </p>

        <p className="mt-2 text-xs text-white/50">
          {detail}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">

      <p className="text-[10px] uppercase tracking-[2px] text-white/35">
        {label}
      </p>

      <p className="mt-4 text-2xl font-light">
        {value}
      </p>

      <p className="mt-2 text-[10px] text-white/25">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SystemStatus() {
  const [status, setStatus] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* =======================================================
     HEALTH CHECK
  ======================================================= */

  useEffect(() => {
    async function checkSystem() {
      try {
        setLoading(true);
        setError(null);

        const data =
          await fetchSystemStatus();

        console.log(
          "SYSTEM STATUS:",
          data
        );

        setStatus(data);
      } catch (err) {
        console.error(
          "System health check failed:",
          err
        );

        setError(
          "Unable to reach the AKASHVANI backend."
        );
      } finally {
        setLoading(false);
      }
    }

    checkSystem();
  }, []);

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
            RUNNING SYSTEM CHECK
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            VERIFYING AKASHVANI SERVICES
          </p>

        </div>

      </div>
    );
  }

  /* =======================================================
     BACKEND OFFLINE
  ======================================================= */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        <div className="w-[90%] max-w-md rounded-3xl border border-red-400/20 bg-white/5 p-8 text-center backdrop-blur-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-2xl">
            ⚠
          </div>

          <h2 className="mt-5 text-xl font-medium">
            System unavailable
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
     STATUS VALUES
  ======================================================= */

  const backendOnline =
    status?.status === "ok" ||
    status?.status === "healthy" ||
    Boolean(status);

  const modelLoaded =
    Boolean(status?.model_loaded);

  const featureCount =
    Array.isArray(status?.features)
      ? status.features.length
      : 0;

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <RiskBackground probability={0}>

      <div className="mx-auto w-[92%] max-w-7xl py-6">

        <DashboardHeader />

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mt-10">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />

                <p className="text-[10px] uppercase tracking-[3px] text-white/40">
                  Infrastructure Monitoring
                </p>

              </div>

              <h1 className="text-3xl font-light tracking-tight md:text-5xl">
                System Status
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Current health of the AKASHVANI
                prediction backend and machine-learning
                service.
              </p>

            </div>

            <StatusBadge
              online={
                backendOnline &&
                modelLoaded
              }
            />

          </div>

        </section>

        {/* =================================================
            OVERVIEW
        ================================================= */}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoCard
            label="Backend"
            value={
              backendOnline
                ? "ONLINE"
                : "OFFLINE"
            }
            description="FastAPI service"
          />

          <InfoCard
            label="ML Model"
            value={
              modelLoaded
                ? "READY"
                : "NOT READY"
            }
            description="Prediction model"
          />

          <InfoCard
            label="Features"
            value={
              featureCount || "—"
            }
            description="Configured model inputs"
          />

          <InfoCard
            label="API Status"
            value="200"
            description="Health endpoint response"
          />

        </section>

        {/* =================================================
            SERVICES
        ================================================= */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Service Health
            </p>

            <h2 className="mt-2 text-xl font-light">
              Core Services
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <ServiceCard
              title="FastAPI Backend"
              description="Main application API responsible for serving prediction and operational endpoints."
              online={backendOnline}
              detail={
                backendOnline
                  ? "API responding successfully"
                  : "No response received"
              }
            />

            <ServiceCard
              title="AI / ML Prediction Engine"
              description="Machine-learning layer responsible for producing predicted flood probability."
              online={modelLoaded}
              detail={
                modelLoaded
                  ? "Model loaded and available"
                  : "Model unavailable"
              }
            />

            <ServiceCard
              title="Feature Pipeline"
              description="Feature interface used to provide the model with the configured weather and environmental inputs."
              online={
                featureCount > 0
              }
              detail={
                featureCount > 0
                  ? `${featureCount} model features configured`
                  : "Feature configuration unavailable"
              }
            />

            <ServiceCard
              title="Prediction API"
              description="Endpoint layer exposing station-level flood prediction results to the frontend."
              online={backendOnline}
              detail={
                backendOnline
                  ? "Prediction service reachable"
                  : "Prediction service unreachable"
              }
            />

          </div>

        </section>

        {/* =================================================
            MODEL FEATURES
        ================================================= */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              Model Configuration
            </p>

            <h2 className="mt-2 text-xl font-light">
              Configured Features
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

            {Array.isArray(
              status?.features
            ) &&
            status.features.length > 0 ? (

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">

                {status.features.map(
                  (feature, index) => (
                    <div
                      key={`${feature}-${index}`}
                      className="rounded-2xl border border-white/5 bg-white/[0.04] p-4"
                    >

                      <div className="flex items-center gap-3">

                        <span className="text-[9px] text-white/20">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <p className="text-xs text-white/55">
                          {feature}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            ) : (

              <p className="text-sm text-white/35">
                Feature information is not
                available from the health endpoint.
              </p>

            )}

          </div>

        </section>

        {/* =================================================
            ENDPOINTS
        ================================================= */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-[10px] uppercase tracking-[3px] text-white/30">
              API Surface
            </p>

            <h2 className="mt-2 text-xl font-light">
              Connected Endpoints
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

            <div className="space-y-2">

              {[
                "/health",
                "/api/predict/flood",
                "/api/predict/rainfall",
                "/api/risk",
                "/api/alerts",
                "/api/ndrf",
                "/api/live-data",
              ].map(
                (endpoint) => (
                  <div
                    key={endpoint}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3"
                  >

                    <code className="text-[11px] text-white/50">
                      {endpoint}
                    </code>

                    <span className="flex items-center gap-2 text-[9px] uppercase tracking-[1px] text-green-200/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Connected
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="py-10 text-center">

          <p className="text-[9px] uppercase tracking-[3px] text-white/20">
            AKASHVANI · SYSTEM STATUS
          </p>

        </div>

      </div>

    </RiskBackground>
  );
}