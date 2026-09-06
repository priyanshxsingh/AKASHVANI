import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import RiskBackground from "../components/dashboard/RiskBackground";

import {
  fetchRainfallPredictions,
  fetchFloodPredictions,
} from "../services/api";

/* =========================================================
   HELPERS
========================================================= */

function getRainfallStatus(rainfall) {
  if (rainfall >= 100) return "EXTREME";
  if (rainfall >= 75) return "HEAVY";
  if (rainfall >= 50) return "MODERATE";
  return "NORMAL";
}

function getRiskLabel(probability) {
  if (probability >= 75) return "HIGH RISK";
  if (probability >= 50) return "MODERATE RISK";
  return "LOW RISK";
}

function formatNumber(value, decimals = 1) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toFixed(decimals);
}

/* =========================================================
   WEATHER METRIC
========================================================= */

function WeatherMetric({
  label,
  value,
  unit,
  description,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl transition duration-300 hover:bg-white/[0.1]">
      <p className="text-[10px] uppercase tracking-[2px] text-white/40">
        {label}
      </p>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-3xl font-light tracking-tight">
          {value}
        </span>

        {unit && (
          <span className="pb-1 text-xs text-white/40">
            {unit}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs leading-5 text-white/35">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   SOURCE BADGE
========================================================= */

function SourceBadge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[9px] uppercase tracking-[1.5px] text-white/50">
      {children}
    </span>
  );
}

/* =========================================================
   WEATHER ROW
========================================================= */

function WeatherRow({ station }) {
  const rainfall =
    Number(station.satellite_rainfall_mm) || 0;

  const nwp =
    Number(station.nwp_forecast_3h_mm) || 0;

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-white/5 py-5 last:border-b-0 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-center">

      {/* LOCATION */}
      <div>
        <p className="text-sm font-medium">
          {station.city}
        </p>

        <p className="mt-1 text-[11px] text-white/35">
          {station.state}
        </p>
      </div>

      {/* SATELLITE */}
      <div>
        <p className="text-[9px] uppercase tracking-[1.5px] text-white/30">
          Satellite Rainfall
        </p>

        <p className="mt-1 text-sm">
          {formatNumber(rainfall)}
          <span className="ml-1 text-xs text-white/35">
            mm
          </span>
        </p>
      </div>

      {/* NWP */}
      <div>
        <p className="text-[9px] uppercase tracking-[1.5px] text-white/30">
          NWP · 3h
        </p>

        <p className="mt-1 text-sm">
          {formatNumber(nwp)}
          <span className="ml-1 text-xs text-white/35">
            mm
          </span>
        </p>
      </div>

      {/* STATUS */}
      <div className="md:text-right">
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[9px] uppercase tracking-[1.5px] text-white/60">
          {getRainfallStatus(rainfall)}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function WeatherIntelligence() {
  const [rainfallStations, setRainfallStations] =
    useState([]);

  const [floodStations, setFloodStations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* =======================================================
     FETCH ACTUAL BACKEND DATA
  ======================================================= */

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true);
        setError(null);

        const [
          rainfallData,
          floodData,
        ] = await Promise.all([
          fetchRainfallPredictions(),
          fetchFloodPredictions(),
        ]);

        console.log(
          "RAINFALL API:",
          rainfallData
        );

        console.log(
          "FLOOD API:",
          floodData
        );

        setRainfallStations(
          rainfallData?.stations || []
        );

        setFloodStations(
          floodData?.stations || []
        );
      } catch (err) {
        console.error(
          "Weather intelligence error:",
          err
        );

        setError(
          "Unable to load weather intelligence data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWeatherData();
  }, []);

  /* =======================================================
     MERGE RAINFALL + FLOOD DATA
  ======================================================= */

  const mergedStations = useMemo(() => {
    return rainfallStations.map((rainfallStation) => {
      const floodStation = floodStations.find(
        (station) =>
          station.city?.toLowerCase() ===
          rainfallStation.city?.toLowerCase()
      );

      return {
        ...rainfallStation,
        ...(floodStation || {}),
      };
    });
  }, [
    rainfallStations,
    floodStations,
  ]);

  /* =======================================================
     WEATHER SUMMARY
  ======================================================= */

  const summary = useMemo(() => {
    if (mergedStations.length === 0) {
      return {
        averageRainfall: 0,
        averageNwp: 0,
        highestRainfall: null,
        highRiskCount: 0,
      };
    }

    const rainfallValues =
      mergedStations
        .map(
          (station) =>
            Number(
              station.satellite_rainfall_mm
            )
        )
        .filter(Number.isFinite);

    const nwpValues =
      mergedStations
        .map(
          (station) =>
            Number(
              station.nwp_forecast_3h_mm
            )
        )
        .filter(Number.isFinite);

    const highestRainfall =
      [...mergedStations].sort(
        (a, b) =>
          Number(
            b.satellite_rainfall_mm || 0
          ) -
          Number(
            a.satellite_rainfall_mm || 0
          )
      )[0];

    const highRiskCount =
      floodStations.filter(
        (station) =>
          Number(station.probability) >= 75
      ).length;

    return {
      averageRainfall:
        rainfallValues.length
          ? rainfallValues.reduce(
              (sum, value) =>
                sum + value,
              0
            ) /
            rainfallValues.length
          : 0,

      averageNwp:
        nwpValues.length
          ? nwpValues.reduce(
              (sum, value) =>
                sum + value,
              0
            ) /
            nwpValues.length
          : 0,

      highestRainfall,

      highRiskCount,
    };
  }, [
    mergedStations,
    floodStations,
  ]);

  /* =======================================================
     HIGHEST RISK STATION
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
            INITIALIZING WEATHER INTELLIGENCE
          </p>

          <p className="mt-2 text-[10px] tracking-[2px] text-white/30">
            CONNECTING TO WEATHER DATA
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
            Weather intelligence unavailable
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
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

                <p className="text-[10px] uppercase tracking-[3px] text-white/40">
                  Atmospheric Monitoring
                </p>
              </div>

              <h1 className="text-3xl font-light tracking-tight md:text-5xl">
                Weather Intelligence
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                Integrated precipitation and
                numerical weather prediction
                information across monitored
                locations.
              </p>

            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">

              <span className="text-[9px] uppercase tracking-[2px] text-white/45">
                {mergedStations.length} monitored locations
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            METRICS
        ================================================= */}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <WeatherMetric
            label="Average Rainfall"
            value={formatNumber(
              summary.averageRainfall
            )}
            unit="mm"
            description="Satellite precipitation signal"
          />

          <WeatherMetric
            label="NWP Forecast"
            value={formatNumber(
              summary.averageNwp
            )}
            unit="mm / 3h"
            description="Numerical weather prediction"
          />

          <WeatherMetric
            label="Peak Rainfall"
            value={formatNumber(
              summary.highestRainfall
                ?.satellite_rainfall_mm
            )}
            unit="mm"
            description={
              summary.highestRainfall
                ?.city ||
              "No station data"
            }
          />

          <WeatherMetric
            label="High Risk Stations"
            value={summary.highRiskCount}
            unit="stations"
            description="Flood probability ≥ 75%"
          />

        </section>

        {/* =================================================
            PEAK RAINFALL
        ================================================= */}

        {summary.highestRainfall && (
          <section className="mt-5">

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                <div>

                  <div className="flex flex-wrap gap-2">

                    <SourceBadge>
                      Highest precipitation
                    </SourceBadge>

                    <SourceBadge>
                      Satellite
                    </SourceBadge>

                  </div>

                  <h2 className="mt-4 text-2xl font-light">
                    {summary.highestRainfall.city}
                  </h2>

                  <p className="mt-1 text-xs text-white/35">
                    {summary.highestRainfall.state}
                  </p>

                </div>

                <div className="md:text-right">

                  <p className="text-4xl font-light">

                    {formatNumber(
                      summary.highestRainfall
                        .satellite_rainfall_mm
                    )}

                    <span className="ml-2 text-sm text-white/35">
                      mm
                    </span>

                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[2px] text-white/35">
                    {getRainfallStatus(
                      Number(
                        summary.highestRainfall
                          .satellite_rainfall_mm
                      )
                    )}{" "}
                    PRECIPITATION
                  </p>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* =================================================
            REGIONAL WEATHER
        ================================================= */}

        <section className="mt-8">

          <div className="mb-4">

            <p className="text-[10px] uppercase tracking-[3px] text-white/35">
              Regional Monitoring
            </p>

            <h2 className="mt-2 text-xl font-light">
              Weather Conditions
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-5 backdrop-blur-xl">

            <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-white/10 py-4 text-[9px] uppercase tracking-[1.5px] text-white/25 md:grid">

              <span>Location</span>

              <span>Satellite</span>

              <span>NWP · 3h</span>

              <span className="text-right">
                Condition
              </span>

            </div>

            {mergedStations.length > 0 ? (

              mergedStations.map(
                (station) => (
                  <WeatherRow
                    key={station.city}
                    station={station}
                  />
                )
              )

            ) : (

              <div className="py-12 text-center">

                <p className="text-sm text-white/40">
                  No weather station data
                  available.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* =================================================
            DATA SOURCES
        ================================================= */}

        <section className="mt-8">

          <div className="mb-4">

            <p className="text-[10px] uppercase tracking-[3px] text-white/35">
              Intelligence Pipeline
            </p>

            <h2 className="mt-2 text-xl font-light">
              Data Interpretation
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <SourceBadge>
                Satellite
              </SourceBadge>

              <h3 className="mt-5 text-base font-medium">
                Precipitation signal
              </h3>

              <p className="mt-3 text-xs leading-6 text-white/40">
                Satellite precipitation
                information contributes to
                the monitored rainfall
                picture.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <SourceBadge>
                Radar
              </SourceBadge>

              <h3 className="mt-5 text-base font-medium">
                Precipitation structure
              </h3>

              <p className="mt-3 text-xs leading-6 text-white/40">
                Radar-related information
                contributes precipitation
                and echo characteristics
                to the prediction pipeline.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <SourceBadge>
                NWP
              </SourceBadge>

              <h3 className="mt-5 text-base font-medium">
                Forecast information
              </h3>

              <p className="mt-3 text-xs leading-6 text-white/40">
                Numerical weather prediction
                provides forecast context
                for upcoming rainfall
                conditions.
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            FLOOD CONTEXT
        ================================================= */}

        {highestRiskStation && (

          <section className="mt-8">

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[3px] text-white/35">
                    Weather → Flood Context
                  </p>

                  <h2 className="mt-3 text-xl font-light">
                    {highestRiskStation.city}
                  </h2>

                  <p className="mt-2 max-w-xl text-xs leading-6 text-white/40">
                    Weather conditions are
                    interpreted alongside
                    flood prediction output
                    to provide regional risk
                    context.
                  </p>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-3xl font-light">
                    {formatNumber(
                      highestRiskStation.probability,
                      2
                    )}
                    %
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[2px] text-white/35">
                    {getRiskLabel(
                      Number(
                        highestRiskStation.probability
                      )
                    )}
                  </p>

                </div>

              </div>

            </div>

          </section>

        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="py-10 text-center">

          <p className="text-[9px] uppercase tracking-[3px] text-white/20">
            AKASHVANI · WEATHER INTELLIGENCE
          </p>

        </div>

      </div>
    </RiskBackground>
  );
}