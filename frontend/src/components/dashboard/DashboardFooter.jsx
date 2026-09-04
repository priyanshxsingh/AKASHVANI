export default function DashboardFooter() {

  return (

    <footer className="flex flex-col justify-between gap-3 border-t border-white/15 py-6 text-[9px] tracking-widest text-white/40 sm:flex-row">

      <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">

        <span className="font-semibold tracking-[3px] text-white/60">
          AKASHVANI
        </span>

        <span>
          AI-POWERED FLOOD EARLY WARNING SYSTEM
        </span>

      </div>


      <span>
        LAST UPDATED · JUST NOW
      </span>

    </footer>
  );
}