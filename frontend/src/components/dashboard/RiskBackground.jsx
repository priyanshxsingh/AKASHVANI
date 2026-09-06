function getRisk(probability) {
  if (probability >= 75) return "high";
  if (probability >= 50) return "moderate";
  return "low";
}

function getRiskData(risk) {
  if (risk === "high") {
    return {
      background: "/images/stromyday.jpg",
      label: "HIGH FLOOD RISK",
      icon: "⚠",
      badge: "bg-red-500/25 border-red-300/30",
    };
  }

  if (risk === "moderate") {
    return {
      background: "/images/cloudyDay.jpg",
      label: "MODERATE RISK",
      icon: "◐",
      badge: "bg-yellow-500/25 border-yellow-300/30",
    };
  }

  return {
    background: "/images/sunnyDay.jpg",
    label: "NORMAL CONDITIONS",
    icon: "✓",
    badge: "bg-green-500/25 border-green-300/30",
  };
}

export { getRisk, getRiskData };

export default function RiskBackground({
  probability = 0,
  children,
}) {
  const risk = getRisk(probability);
  const riskData = getRiskData(risk);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white transition-all duration-1000"
      style={{
        backgroundImage: `url(${riskData.background})`,
      }}
    >
      <div className="min-h-screen bg-black/50">
        {children}
      </div>
    </div>
  );
}