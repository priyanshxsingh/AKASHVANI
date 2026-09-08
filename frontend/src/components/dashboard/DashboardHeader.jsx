import { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { mainNavigation } from "../../config/navigation";

export default function DashboardHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({
      redirectUrl: "/login",
    });
  };

  return (
    <header className="sticky top-0 z-50 mb-12 py-4 flex items-center justify-between bg-black/40 backdrop-blur-lg border-b border-white/5 -mx-4 px-4 sm:-mx-8 sm:px-8">

      {/* ================= LEFT ================= */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl">
          <img
            src="/akashvani-logo.png"
            alt="Akashvani"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-lg font-semibold tracking-[3px] text-[#d2a565]">
            AKASHVANI
          </h1>

          <p className="text-[9px] tracking-[3px] text-white/60">
            THE VOICE OF THE SKY
          </p>
        </div>

      </div>


      {/* ================= CENTER (NAVIGATION) ================= */}

      <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/3 px-1.5 py-1.5 backdrop-blur-md shadow-lg">
        {mainNavigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              [
                "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all",
                isActive
                  ? "border border-white/10 bg-white/10 text-[#d2a565] shadow-sm"
                  : "border border-transparent text-white/50 hover:bg-white/5 hover:text-white",
              ].join(" ")
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>


      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-4">

        {/* SYSTEM ONLINE */}

        <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] tracking-widest backdrop-blur-xl sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          SYSTEM ONLINE
        </div>


        {/* ================= PROFILE ================= */}

        <div className="relative">

          {/* Profile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="
              flex h-11 w-11 items-center justify-center
              overflow-hidden
              rounded-full
              border border-white/30
              bg-white/15
              shadow-lg
              backdrop-blur-xl
              transition-all duration-300
              hover:scale-105
              hover:bg-white/25
              hover:border-white/50
              active:scale-95
            "
          >

            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-white">
                {user?.firstName?.charAt(0) || "U"}
              </span>
            )}

          </button>


          {/* ================= PROFILE MENU ================= */}

          {open && (
            <div
              className="
                absolute right-0 top-14 z-50
                w-64
                rounded-3xl
                border border-white/20
                bg-black/70
                p-3
                shadow-2xl
                backdrop-blur-2xl
              "
            >

              {/* User Information */}

              <div className="rounded-2xl bg-white/10 p-4">

                <p className="text-sm font-medium text-white">
                  {user?.fullName || "User"}
                </p>

                <p className="mt-1 truncate text-xs text-white/50">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>

              </div>


              {/* Divider */}

              <div className="my-2 h-px bg-white/10" />


              {/* Sign Out */}

              <button
                onClick={handleLogout}
                className="
                  flex w-full items-center gap-3
                  rounded-2xl
                  px-4 py-3
                  text-sm
                  text-white/80
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <span className="text-lg">
                  ↪
                </span>

                <span>
                  Sign out
                </span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}