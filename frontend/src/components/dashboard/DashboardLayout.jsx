import BottomNavigation from "./BottomNavigation";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Add bottom padding on mobile so content isn't covered by bottom nav */}
      <main className="min-h-screen pb-20 lg:pb-0">
        {children}
      </main>

      <BottomNavigation />
    </div>
  );
}

export default DashboardLayout;