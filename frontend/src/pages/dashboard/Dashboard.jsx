import { useState } from "react";
import StationCard from "../../components/dashboard/StationCard";
import StatCard from "../../components/dashboard/StatCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const stations = [
  {
    city: "Guwahati",
    state: "Assam",
    rainfall: 88.5,
    nwp: 82.0,
    probability: 100,
    population: 45000,
    priority: 1,
    corridor: "Elevated bypass corridor",
    equipment: "Heavy waterlogging equipment",
  },
  {
    city: "Patna",
    state: "Bihar",
    rainfall: 72.1,
    nwp: 65.0,
    probability: 98.58,
    population: 62000,
    priority: 1,
    corridor: "Elevated bypass corridor",
    equipment: "Heavy waterlogging equipment",
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    rainfall: 45.0,
    nwp: 42.0,
    probability: 99.93,
    population: 38000,
    priority: 2,
    corridor: "Passable with high-clearance vehicles",
    equipment: "Standby on trailer",
  },
  {
    city: "Cuttack",
    state: "Odisha",
    rainfall: 12.5,
    nwp: 5.0,
    probability: 8.24,
    population: 15000,
    priority: 3,
    corridor: "Normal transit authorized",
    equipment: "Not required",
  },
  {
    city: "Dibrugarh",
    state: "Assam",
    rainfall: 94.2,
    nwp: 91.0,
    probability: 97.33,
    population: 51000,
    priority: 1,
    corridor: "Elevated bypass corridor",
    equipment: "Heavy waterlogging equipment",
  },
  {
    city: "Muzaffarpur",
    state: "Bihar",
    rainfall: 68.0,
    nwp: 59.0,
    probability: 68.2,
    population: 41000,
    priority: 1,
    corridor: "Elevated bypass corridor",
    equipment: "Heavy waterlogging equipment",
  },
];

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

export default function Dashboard() {
  const [selectedStation, setSelectedStation] = useState(stations[2]);

  const risk = getRisk(selectedStation.probability);
  const riskData = getRiskData(risk);

  const highRiskStations = stations.filter(
    (station) => station.probability >= 75,
  ).length;

  const totalPopulation = stations.reduce(
    (total, station) => total + station.population,
    0,
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white transition-all duration-1000"
      style={{
        backgroundImage: `url(${riskData.background})`,
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-black/45">
        <div className="mx-auto w-[92%] max-w-7xl py-6">
          {/* ================= HEADER ================= */}

          <DashboardHeader />
          {/* ================= HERO ================= */}

          <section className="grid items-center gap-10 py-8 md:grid-cols-2">
            <div>
              <p className="text-[10px] tracking-[3px] text-white/60">
                LIVE MONITORING
              </p>

              <h2 className="mt-3 text-6xl font-semibold tracking-[-4px] sm:text-7xl md:text-8xl">
                {selectedStation.city}
              </h2>

              <p className="mt-3 text-xl text-white/60">
                {selectedStation.state}
              </p>
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
                <span className="ml-1 text-3xl text-white/60">%</span>
              </div>

              <p className="text-xs text-white/60">
                Predicted flood inundation probability
              </p>
            </div>
          </section>

          {/* ================= STATS ================= */}

          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              value={`${highRiskStations}/${stations.length}`}
            />
          </section>

          {/* ================= STATIONS ================= */}

          <section className="mt-20">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] tracking-[3px] text-white/50">
                  REAL-TIME DATA
                </p>

                <h2 className="mt-1 text-2xl font-medium">
                  Station Monitoring
                </h2>
              </div>

              <div className="flex items-center gap-2 text-[10px] tracking-widest text-white/60">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                LIVE
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

          {/* ================= SELECTED STATION ================= */}

          <section className="mt-16">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[10px] tracking-[3px] text-white/50">
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
                  title="Population Impact"
                  value={selectedStation.population.toLocaleString()}
                />

                <InfoBox
                  title="Satellite Precipitation"
                  value={`${selectedStation.rainfall} mm`}
                />

                <InfoBox
                  title="NWP Forecast"
                  value={`${selectedStation.nwp} mm`}
                />

                <InfoBox
                  title="Flood Probability"
                  value={`${selectedStation.probability.toFixed(2)}%`}
                />
              </div>
            </div>
          </section>

          {/* ================= NDRF RESPONSE ================= */}

          <section className="mt-20">
            <div className="mb-5">
              <p className="text-[10px] tracking-[3px] text-white/50">
                RESPONSE COORDINATION
              </p>

              <h2 className="mt-1 text-2xl font-medium">
                NDRF Tactical Response
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <div
                  key={station.city}
                  className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{station.city}</h3>

                      <p className="text-xs text-white/50">{station.state}</p>
                    </div>

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] ${
                        station.priority === 1
                          ? "bg-red-500/30"
                          : station.priority === 2
                            ? "bg-yellow-500/30"
                            : "bg-green-500/30"
                      }`}
                    >
                      P{station.priority}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <ResponseRow
                      title="Population Impact"
                      value={station.population.toLocaleString()}
                    />

                    <ResponseRow
                      title="Road Status"
                      value={
                        getRisk(station.probability) === "high"
                          ? "✕ Highway Blocked"
                          : "✓ Roads Clear"
                      }
                    />

                    <ResponseRow
                      title="Safe Transit"
                      value={station.corridor}
                    />

                    <ResponseRow
                      title="NDRF Equipment"
                      value={station.equipment}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SUMMARY ================= */}

          <section className="my-20">
            <div className="grid gap-8 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl md:grid-cols-3">
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
                title="DATA SOURCES"
                value="04"
                description="Satellite · Radar · NWP · Stations"
              />
            </div>
          </section>

          {/* ================= FOOTER ================= */}

          <footer className="flex flex-col justify-between gap-3 border-t border-white/15 py-6 text-[9px] tracking-widest text-white/40 sm:flex-row">
            <span className="font-semibold tracking-[3px]">AKASHVANI</span>

            <span>AI-POWERED FLOOD EARLY WARNING SYSTEM</span>

            <span>LAST UPDATED · JUST NOW</span>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   SMALL COMPONENTS
================================ */

function InfoBox({ title, value }) {
  return (
    <div className="rounded-2xl bg-black/10 p-4">
      <p className="text-[9px] tracking-wider text-white/45">{title}</p>

      <p className="mt-2 text-lg font-medium">{value}</p>
    </div>
  );
}

function ResponseRow({ title, value }) {
  return (
    <div className="border-t border-white/10 pt-3">
      <div className="flex justify-between gap-4">
        <span className="text-[9px] text-white/45">{title}</span>

        <span className="max-w-[60%] text-right text-[10px] text-white/80">
          {value}
        </span>
      </div>
    </div>
  );
}

function Summary({ title, value, description }) {
  return (
    <div>
      <p className="text-[9px] tracking-[2px] text-white/45">{title}</p>

      <h2 className="mt-2 text-3xl font-medium">{value}</h2>

      <p className="mt-1 text-[10px] text-white/40">{description}</p>
    </div>
  );
}
