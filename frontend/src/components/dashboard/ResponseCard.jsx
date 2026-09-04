import {
  getRisk,
} from "../../pages/dashboard/Dashboard";


export default function ResponseCard({
  station,
}) {

  const risk = getRisk(
    station.probability
  );


  return (

    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl transition duration-300 hover:bg-white/15">


      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-medium">
            {station.city}
          </h3>

          <p className="text-xs text-white/50">
            {station.state}
          </p>

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


      {/* INFORMATION */}

      <div className="mt-5 space-y-3">

        <ResponseRow
          title="Population Impact"
          value={station.population.toLocaleString()}
        />


        <ResponseRow
          title="Road Status"
          value={
            risk === "high"
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
  );
}


function ResponseRow({
  title,
  value,
}) {

  return (

    <div className="border-t border-white/10 pt-3">

      <div className="flex justify-between gap-4">

        <span className="text-[9px] text-white/45">
          {title}
        </span>

        <span className="max-w-[60%] text-right text-[10px] text-white/80">
          {value}
        </span>

      </div>

    </div>
  );
}