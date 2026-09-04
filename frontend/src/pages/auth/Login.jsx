import { SignIn } from "@clerk/clerk-react";
import { CloudRain, ShieldCheck, Cloud, RadioTower } from "lucide-react";

function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111d] text-white">
      {/* ================================
          BACKGROUND
      ================================= */}

      <div
        className="
          absolute inset-0
          bg-[url('/rain-mountain.jpg')]
          bg-cover
          bg-center
          scale-[1.03]
       
        "
      />

      {/* Light atmospheric fade overlay */}
      <div
        className="
          absolute inset-0
          bg-white/15
         
        "
      />

      {/* ================================
          MOBILE TOP NAV
      ================================= */}
      <div
        className="
          absolute
          top-6
          left-1/2
          -translate-x-1/2
          w-[92%]
          max-w-[420px]
          lg:hidden
          flex
          items-center
          justify-start
          px-5
          py-3
          rounded-[24px]
          bg-gradient-to-br
          from-[#1b2b3a]/60
          to-[#05101b]/50
          backdrop-blur-xl
          border
          border-white/10
          shadow-[0_30px_80px_rgba(0,0,0,0.48)]
          z-50
        "
      >
        <img
          src="/akashvani-logo.png"
          alt="AKASHVANI"
          className="
            h-9
            w-9
            sm:h-10
            sm:w-10
            rounded-full
            object-cover
            flex-shrink-0
            shadow-md
          "
        />
        <div className="ml-3 sm:ml-4 flex flex-col justify-center">
          <span className="text-white text-[15px] sm:text-base font-bold tracking-widest leading-none">AKASHVANI</span>
          <span className="text-[#d2a565] text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium mt-1">The Voice Of The Sky</span>
        </div>
        

      </div>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <div
        className="
          relative z-10
          min-h-screen
          grid
          grid-cols-1
          lg:grid-cols-[1.15fr_0.85fr]
          items-center
          gap-8
          lg:gap-14
          px-3
          sm:px-6
          lg:px-[6vw]
          pt-[110px]
          pb-8
          lg:pt-6
          lg:pb-6
        "
      >
        {/* =================================
            LEFT SIDE — BRAND
        ================================= */}

        <section
          className="
            hidden
            lg:flex
            w-full
            min-w-0
            min-h-full
            items-center
            justify-center
          "
        >
          <div
            className="
              w-full
              max-w-2xl
              text-center
            "
          >
            {/* Top Badge */}
            <div
              className="
                relative
                lg:absolute
                top-0
                lg:top-10
                left-0
                lg:left-10
                mb-6
                lg:mb-0
                mx-auto
                inline-flex
                items-center
                justify-center
                gap-1.5
                lg:gap-2
                rounded-full
                border
                border-[#d2a565]/50
                bg-black/40
                px-3
                lg:px-4
                py-1
                lg:py-1.5
                text-[11px]
                sm:text-[13px]
                lg:text-[15px]
                font-semibold
                tracking-widest
                text-[#d2a565]
                backdrop-blur-md
              "
            >
              <CloudRain size={16} className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
              <span>INTELLIGENT WEATHER SYSTEM</span>
            </div>

            {/* =================================
    LOGO
================================= */}

            <div
              className="
    relative
    mx-auto
    mt-4
    flex
    w-full
    max-w-[280px]
    sm:max-w-[400px]
    lg:max-w-[650px]
    items-center
    justify-center
  "
            >
              {/* Large soft atmospheric glow */}

              <div
                className="
      absolute
      left-1/2
      top-1/2
      h-[105%]
      w-[105%]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.72)_18%,rgba(225,240,255,0.42)_38%,rgba(190,220,250,0.20)_55%,transparent_75%)]
      blur-[45px]
    "
              />

              {/* Second softer outer glow */}

              <div
                className="
      absolute
      left-1/2
      top-1/2
      h-[125%]
      w-[125%]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-[radial-gradient(ellipse_at_center,rgba(235,245,255,0.45)_0%,rgba(210,230,250,0.20)_35%,transparent_70%)]
      blur-[70px]
    "
              />

              {/* Bright center light */}

              <div
                className="
      absolute
      left-1/2
      top-1/2
      h-[75%]
      w-[90%]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-[radial-gradient(ellipse,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.5)_40%,transparent_75%)]
      blur-[35px]
    "
              />

              {/* Logo */}

              <img
                src="/akashvani-logo-transparent.png"
                alt="AKASHVANI"
                className="
      relative
      z-10
      mx-auto
      block
      w-[95%]
      object-contain
      contrast-125
      brightness-75
      drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]
    "
              />
            </div>


            {/* Description */}
            <p
              className="
                mt-2
                lg:-mt-24
                mx-auto
                max-w-[90%]
                sm:max-w-md
                lg:max-w-lg
                text-sm
                font-semibold
                leading-relaxed
                text-black
                lg:text-slate-50
                sm:text-[15px]
              "
            >
              Your intelligent companion for weather information,<br className="hidden sm:block" />
              early warnings and atmospheric insights.
            </p>

            {/* =================================
                FEATURES
            ================================= */}
            <div
              className="
                mt-6
                lg:mt-8
                hidden
                lg:inline-flex
                flex-wrap
                lg:flex-nowrap
                items-start
                justify-center
                gap-4
                lg:gap-6
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-4
                sm:px-8
                py-4
                sm:py-6
                shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                backdrop-blur-md
                sm:gap-10
              "
            >
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <RadioTower size={34} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[34px] text-[#d2a565] mb-2 lg:mb-4" strokeWidth={1.5} />
                <h4 className="text-[11px] sm:text-[13.5px] font-medium text-slate-100 leading-snug tracking-wide">
                  Real-Time<br />Intelligence
                </h4>
              </div>

              {/* Separator */}
              <div className="mt-4 lg:mt-5 h-[3px] w-[3px] rounded-full bg-[#d2a565]/80" />

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={34} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[34px] text-[#d2a565] mb-2 lg:mb-4" strokeWidth={1.5} />
                <h4 className="text-[11px] sm:text-[13.5px] font-medium text-slate-100 leading-snug tracking-wide">
                  Early Warning<br />System
                </h4>
              </div>

              {/* Separator */}
              <div className="mt-4 lg:mt-5 h-[3px] w-[3px] rounded-full bg-[#d2a565]/80" />

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <Cloud size={34} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[34px] text-[#d2a565] mb-2 lg:mb-4" strokeWidth={1.5} />
                <h4 className="text-[11px] sm:text-[13.5px] font-medium text-slate-100 leading-snug tracking-wide">
                  Atmospheric<br />Insights
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* =================================
            RIGHT SIDE — LOGIN
        ================================= */}

        <section
          className="
            flex
            w-full
            min-w-0
            justify-center
          "
        >
          {/* Outer Thin Border Frame */}
          <div className="w-full mx-auto max-w-[500px] rounded-[34px] border-2 border-[#d2a565]/40 p-1.5 sm:p-3 shadow-[0_0_20px_rgba(210,165,101,0.15)]">
            {/* Inner Glass Container */}
            <div
              className="
                w-full
                rounded-[26px]
                border
                border-white/10
                bg-gradient-to-br
                from-[#1b2b3a]/60
                to-[#05101b]/50
                p-5
                shadow-[0_30px_80px_rgba(0,0,0,0.48)]
                backdrop-blur-xl
                sm:p-8
              "
            >
              {/* =================================
                  LOGIN HEADING
              ================================= */}

            <div className="mb-5 text-center">
              <p
                className="
                  mb-2
                  text-[10px]
                  font-bold
                  tracking-[0.28em]
                  text-blue-400
                "
              >
                WELCOME BACK
              </p>

              <h1
                className="
                  font-serif
                  text-3xl
                  leading-tight
                  sm:text-[31px]
                "
              >
                Sign in to <span className="text-[#d2a565]">AKASHVANI</span>
              </h1>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-sm
                  text-xs
                  leading-5
                  text-slate-300/75
                "
              >
                Sign in to continue exploring the intelligence behind the sky.
              </p>
            </div>

            {/* =================================
                CLERK SIGN IN
            ================================= */}

            <SignIn
              routing="path"
              path="/login"
              signUpUrl="/signup"
              fallbackRedirectUrl="/dashboard"
              appearance={{
                variables: {
                  colorPrimary: "#3b9cff",

                  colorBackground: "transparent",

                  colorForeground: "#f5f8fc",

                  colorInputBackground: "rgba(255,255,255,0.055)",

                  colorInputText: "#ffffff",

                  colorNeutral: "#ffffff",

                  colorDanger: "#ff7d7d",

                  borderRadius: "12px",
                },

                elements: {
                  /* Main Clerk container */
                  rootBox: {
                    width: "100%",
                  },

                  card: {
                    background: "rgba(255, 255, 255, 0.02)",
                    boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    width: "100%",
                    maxWidth: "100%",
                    padding: "1.5rem",
                    borderRadius: "20px",
                  },

                  /* Remove Clerk heading */

                  headerTitle: {
                    display: "none",
                  },

                  headerSubtitle: {
                    display: "none",
                  },

                  /* Google button */

                  socialButtonsBlockButton: {
                    background: "rgba(255,255,255,0.055)",

                    border: "1px solid rgba(255,255,255,0.2)",

                    color: "#ffffff",

                    height: "50px",

                    borderRadius: "12px",

                    transition: "all 0.2s ease",
                  },

                  socialButtonsBlockButtonText: {
                    color: "#ffffff",

                    fontWeight: "500",
                  },

                  /* Labels */

                  formFieldLabel: {
                    color: "#d9e2ec",

                    fontSize: "13px",

                    fontWeight: "500",
                  },

                  /* Inputs */

                  formFieldInput: {
                    background: "rgba(255,255,255,0.055)",

                    border: "1px solid rgba(255,255,255,0.2)",

                    color: "#ffffff",

                    height: "50px",

                    borderRadius: "11px",
                  },

                  /* Login button */

                  formButtonPrimary: {
                    background: "linear-gradient(135deg,#338fe8,#1766b8)",

                    color: "#ffffff",

                    height: "52px",

                    borderRadius: "12px",

                    fontSize: "15px",

                    fontWeight: "600",

                    boxShadow: "0 10px 30px rgba(32,130,220,0.25)",

                    transition: "all 0.2s ease",
                  },

                  /* Forgot password */

                  formFieldAction: {
                    color: "#55a9ff",
                  },

                  /* Sign up link */

                  footerActionLink: {
                    color: "#57aaff",
                  },

                  /* Divider */

                  dividerLine: {
                    background: "rgba(255,255,255,0.16)",
                  },

                  dividerText: {
                    color: "#9daab8",
                  },

                  /* OTP */

                  otpCodeFieldInput: {
                    background: "rgba(255,255,255,0.06)",

                    border: "1px solid rgba(255,255,255,0.22)",

                    color: "#ffffff",

                    borderRadius: "10px",
                  },

                  /* Alert */

                  alert: {
                    background: "rgba(255,255,255,0.07)",

                    border: "1px solid rgba(255,255,255,0.15)",

                    color: "#ffffff",
                  },
                },
              }}
            />
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
