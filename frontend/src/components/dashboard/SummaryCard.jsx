export default function SummaryCard({
  title,
  value,
  description,
}) {

  return (

    <div className="p-2">

      <p className="text-[9px] tracking-[2px] text-white/45">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-medium">
        {value}
      </h2>

      <p className="mt-1 text-[10px] text-white/40">
        {description}
      </p>

    </div>
  );
}