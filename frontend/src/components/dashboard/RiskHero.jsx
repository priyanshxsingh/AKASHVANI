export default function RiskHero({
  station,
  config,
}) {
  return (
    <section className="grid items-center gap-10 py-8 md:grid-cols-2">


      {/* LOCATION */}

      <div>

        <p className="text-[10px] tracking-[3px] text-white/60">
          LIVE MONITORING
        </p>

        <h2 className="mt-3 text-6xl font-semibold tracking-[-4px] sm:text-7xl md:text-8xl">
          {station.city}
        </h2>

        <p className="mt-3 text-xl text-white/60">
          {station.state}
        </p>

      </div>


      {/* RISK */}

      <div className="text-center md:text-right">

        <div
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-wider backdrop-blur-xl ${config.badge}`}
        >

          <span>
            {config.icon}
          </span>

          {config.label}

        </div>


        <div className="mt-3 text-7xl font-semibold tracking-[-5px] sm:text-8xl">

          {station.probability.toFixed(1)}

          <span className="ml-1 text-3xl text-white/60">
            %
          </span>

        </div>


        <p className="mt-2 text-xs text-white/60">
          Predicted flood inundation probability
        </p>

      </div>

    </section>
  );
}