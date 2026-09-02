function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wide">
            AKASHVANI
          </h1>

          <p className="text-cyan-400 text-sm mt-2">
            Intelligent Weather Intelligence System
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">

          <div className="mb-7">
            <h2 className="text-2xl font-semibold">
              {title}
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              {subtitle}
            </p>
          </div>

          {children}

        </div>

      </div>
    </div>
  );
}

export default AuthLayout;