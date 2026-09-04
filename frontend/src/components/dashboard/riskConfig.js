export const getRisk = (probability) => {
  if (probability >= 75) return "high";
  if (probability >= 50) return "moderate";
  return "low";
};


export const riskConfig = {
  high: {
    background: "/images/stromyday.jpg",
    label: "HIGH FLOOD RISK",
    icon: "⚠",
    badge:
      "bg-red-500/25 border-red-300/30 text-red-100",
    text: "text-red-100",
    bar: "bg-red-400",
  },

  moderate: {
    background: "/images/cloudyDay.jpg",
    label: "MODERATE RISK",
    icon: "◐",
    badge:
      "bg-yellow-500/25 border-yellow-200/30 text-yellow-100",
    text: "text-yellow-100",
    bar: "bg-yellow-400",
  },

  low: {
    background: "/images/sunnyDay.jpg",
    label: "NORMAL CONDITIONS",
    icon: "✓",
    badge:
      "bg-green-500/25 border-green-200/30 text-green-100",
    text: "text-green-100",
    bar: "bg-green-400",
  },
};