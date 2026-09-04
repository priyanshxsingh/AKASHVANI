function getRisk(probability) {
  if (probability >= 75) return "high";
  if (probability >= 50) return "moderate";
  return "low";
}

const riskStyles = {
  high: {
    icon: "⚠",
    iconBg: "bg-red-500/25 border-red-300/30",
    bar: "bg-red-400",
    text: "text-red-100",
    status: "HIGH RISK WARNING",
  },

  moderate: {
    icon: "◐",
    iconBg: "bg-yellow-500/25 border-yellow-300/30",
    bar: "bg-yellow-400",
    text: "text-yellow-100",
    status: "MODERATE RISK",
  },

  low: {
    icon: "✓",
    iconBg: "bg-green-500/25 border-green-300/30",
    bar: "bg-green-400",
    text: "text-green-100",
    status: "NORMAL CONDITIONS",
  },
};

export default function StationCard({
  station,
  selected,
  onClick,
}) {
  const risk = getRisk(station.probability);
  const style = riskStyles[risk];

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-3xl border p-5 text-left backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${
        selected
          ? "border-white/40 bg-white/25 shadow-2xl"
          : "border-white/15 bg-white/10 hover:bg-white/15"
      }`}
    >

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-xl font-medium">
            {station.city}
          </h3>

          <p className="mt-1 text-xs text-white/50">
            {station.state}
          </p>
        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${style.iconBg}`}
        >
          {style.icon}
        </div>

      </div>


      {/* PROBABILITY */}

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-[10px] text-white/60">

          <span>
            Flood Probability
          </span>

          <strong className="text-white">
            {station.probability.toFixed(1)}%
          </strong>

        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

          <div
            className={`h-full rounded-full transition-all duration-700 ${style.bar}`}
            style={{
              width: `${station.probability}%`,
            }}
          />

        </div>

      </div>


      {/* DATA */}

      <div className="mt-5 grid grid-cols-2 gap-2">

        <div className="rounded-2xl bg-black/10 p-3">

          <p className="text-[9px] text-white/45">
            RAINFALL
          </p>

          <p className="mt-1 text-sm font-medium">
            {station.rainfall} mm
          </p>

        </div>

        <div className="rounded-2xl bg-black/10 p-3">

          <p className="text-[9px] text-white/45">
            NWP · 3H
          </p>

          <p className="mt-1 text-sm font-medium">
            {station.nwp} mm
          </p>

        </div>

      </div>


      {/* STATUS */}

      <p
        className={`mt-5 text-[9px] tracking-widest ${style.text}`}
      >
        ● {style.status}
      </p>

    </button>
  );
}