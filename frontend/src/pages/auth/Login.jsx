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
          px-4
          sm:px-8
          lg:px-[6vw]
          py-6
        "
      >
        {/* =================================
            LEFT SIDE — BRAND
        ================================= */}

        <section
          className="
            flex
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
                absolute
                top-10
                left-10
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d2a565]/50
                bg-black/40
                px-4
                py-1.5
                text-[15px]
                font-semibold
                tracking-widest
                text-[#d2a565]
                backdrop-blur-md
              "
            >
              <CloudRain size={16} />
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
    max-w-[650px]
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
                -mt-4
                mx-auto
                max-w-lg
                text-sm
                font-semibold
                leading-relaxed
                text-slate-50
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
                mt-8
                inline-flex
                items-start
                justify-center
                gap-6
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-8
                py-6
                shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                backdrop-blur-md
                sm:gap-10
              "
            >
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <RadioTower size={34} className="text-[#d2a565] mb-4" strokeWidth={1.5} />
                <h4 className="text-[13.5px] font-medium text-slate-100 leading-snug tracking-wide">
                  Real-Time<br />Intelligence
                </h4>
              </div>

              {/* Separator */}
              <div className="mt-5 h-[3px] w-[3px] rounded-full bg-[#d2a565]/80" />

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={34} className="text-[#d2a565] mb-4" strokeWidth={1.5} />
                <h4 className="text-[13.5px] font-medium text-slate-100 leading-snug tracking-wide">
                  Early Warning<br />System
                </h4>
              </div>

              {/* Separator */}
              <div className="mt-5 h-[3px] w-[3px] rounded-full bg-[#d2a565]/80" />

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <Cloud size={34} className="text-[#d2a565] mb-4" strokeWidth={1.5} />
                <h4 className="text-[13.5px] font-medium text-slate-100 leading-snug tracking-wide">
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
            justify-center
          "
        >
          <div
            className="
              w-full
              max-w-[475px]
              rounded-[27px]
              border
              border-white/20
              bg-gradient-to-br
              from-[#1b2b3a]/60
              to-[#05101b]/50
              p-6
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
                Welcome <span className="text-[#d2a565]">Back</span>
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

                  card: {
                    background: "transparent",

                    boxShadow: "none",

                    border: "none",

                    width: "100%",

                    padding: "0",
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
        </section>
      </div>
    </div>
  );
}

export default Login;
