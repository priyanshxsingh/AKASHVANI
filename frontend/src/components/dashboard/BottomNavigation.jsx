import { NavLink } from "react-router-dom";
import { mainNavigation } from "../../config/navigation";

function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex lg:hidden items-center justify-around border-t border-white/10 bg-black/80 backdrop-blur-2xl px-2 py-3 pb-safe">
      {mainNavigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/dashboard"}
          className={({ isActive }) =>
            [
              "flex flex-col items-center justify-center gap-1 p-1 sm:p-2 rounded-xl transition-all duration-200 flex-1",
              isActive
                ? "text-white"
                : "text-white/40 hover:text-white/70",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={[
                  "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl text-lg transition-all",
                  isActive
                    ? "bg-white/[0.12] text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                    : "bg-transparent",
                ].join(" ")}
              >
                {item.icon}
              </span>
              <span 
                className={[
                  "text-[8px] sm:text-[9px] font-medium tracking-wide text-center leading-[1.1]",
                  isActive ? "text-white/90" : "text-white/40"
                ].join(" ")}
              >
                {item.name}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;
