import { NavLink } from "react-router-dom";

export const mainNavigation = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Risk Analysis",
    path: "/dashboard/risk",
    icon: "◈",
  },
  {
    name: "Weather Intelligence",
    path: "/dashboard/weather",
    icon: "☁",
  },
  {
    name: "Alerts",
    path: "/dashboard/alerts",
    icon: "⚠",
  },
  {
    name: "NDRF Response",
    path: "/dashboard/ndrf",
    icon: "✚",
  },
];

const intelligenceNavigation = [
  {
    name: "Data Sources",
    path: "/dashboard/data-sources",
    icon: "◎",
  },
  {
    name: "System Status",
    path: "/dashboard/system",
    icon: "◉",
  },
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-[260px] flex-col border-r border-white/10 bg-black/20 px-5 py-6 backdrop-blur-2xl">
      {/* Brand */}
      <div className="mb-10 px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-lg shadow-lg">
            ◉
          </div>

          <div>
            <h1 className="text-[15px] font-semibold tracking-[0.18em] text-white">
              AKASHVANI
            </h1>

            <p className="mt-0.5 text-[9px] tracking-[0.14em] text-white/40">
              THE VOICE OF THE SKY
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div>
        <p className="mb-3 px-3 text-[10px] font-medium tracking-[0.18em] text-white/30">
          COMMAND CENTER
        </p>

        <nav className="space-y-1">
          {mainNavigation.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      {/* Intelligence */}
      <div className="mt-8">
        <p className="mb-3 px-3 text-[10px] font-medium tracking-[0.18em] text-white/30">
          INTELLIGENCE
        </p>

        <nav className="space-y-1">
          {intelligenceNavigation.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      {/* Bottom system indicator */}
      <div className="mt-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

            <span className="text-xs font-medium text-white/80">
              System Operational
            </span>
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-white/35">
            AI flood intelligence services are connected.
          </p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/dashboard"}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-2xl px-3 py-3",
          "text-sm transition-all duration-200",
          isActive
            ? "border border-white/10 bg-white/[0.10] text-white shadow-lg"
            : "border border-transparent text-white/45 hover:bg-white/[0.05] hover:text-white/80",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              "flex h-8 w-8 items-center justify-center rounded-xl text-sm transition",
              isActive
                ? "bg-white/[0.12] text-white"
                : "bg-white/[0.04] text-white/40 group-hover:text-white/70",
            ].join(" ")}
          >
            {item.icon}
          </span>

          <span className="flex-1">{item.name}</span>

          {isActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default Sidebar;