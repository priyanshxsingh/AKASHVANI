import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="min-h-screen lg:ml-[260px]">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;