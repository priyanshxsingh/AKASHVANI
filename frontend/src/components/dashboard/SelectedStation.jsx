export default function SelectedStation({
  station,
  risk,
}) {

  return (

    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl">


      {/* HEADER */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>

          <p className="text-[10px] tracking-[3px] text-white/50">
            SELECTED LOCATION
          </p>

          <h2 className="mt-1 text-2xl font-medium">
            {station.city}, {station.state}
          </h2>

        </div>


        <div
          className={`w-fit rounded-full border px-4 py-2 text-[10px] tracking-widest ${
            station.priority === 1
              ? "border-red-300/20 bg-red-500/25"
              : station.priority === 2
              ? "border-yellow-300/20 bg-yellow-500/25"
              : "border-green-300/20 bg-green-500/25"
          }`}
        >
          PRIORITY {station.priority}
        </div>

      </div>


      {/* DETAILS */}

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        <Detail
          title="Population Impact"
          value={station.population.toLocaleString()}
        />

        <Detail
          title="Satellite Precipitation"
          value={`${station.rainfall} mm`}
        />

        <Detail
          title="NWP Forecast"
          value={`${station.nwp} mm`}
        />

        <Detail
          title="Flood Probability"
          value={`${station.probability.toFixed(2)}%`}
        />

      </div>


      {/* STATUS */}

      <div className="mt-5 border-t border-white/10 pt-5">

        <p className="text-[10px] text-white/50">
          CURRENT ASSESSMENT
        </p>

        <p className="mt-2 text-sm">

          {risk === "high"
            ? "Immediate response and evacuation planning recommended."
            : risk === "moderate"
            ? "Continue monitoring rainfall and inundation conditions."
            : "Conditions currently within normal limits."}

        </p>

      </div>

    </div>
  );
}


function Detail({
  title,
  value,
}) {
  return (

    <div className="rounded-2xl bg-black/10 p-4">

      <p className="text-[9px] tracking-wider text-white/45">
        {title}
      </p>

      <p className="mt-2 text-lg font-medium">
        {value}
      </p>

    </div>
  );
}