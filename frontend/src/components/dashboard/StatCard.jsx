export default function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-2xl transition duration-300 hover:bg-white/15">

      {/* ICON */}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-lg">
        {icon}
      </div>


      {/* CONTENT */}

      <div>

        <p className="text-[10px] text-white/50">
          {title}
        </p>

        <h3 className="mt-1 text-xl font-medium">
          {value}
        </h3>

      </div>

    </div>
  );
}