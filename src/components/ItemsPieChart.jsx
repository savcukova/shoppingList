import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useEffect, useState } from "react";

function ItemsPieChart({ items }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [colors, setColors] = useState({ success: "#10b981", error: "#ef4444", text: "#000" });

  // Get colors from CSS variables that adapt to theme
  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // DaisyUI colors - these adapt to light/dark theme
    // Try to get from CSS variables, fallback to defaults
    const getColor = (varName, fallbackVar, defaultValue) => {
      const value = computedStyle.getPropertyValue(varName).trim() || 
                   computedStyle.getPropertyValue(fallbackVar).trim();
      return value || defaultValue;
    };
    
    const successColor = getColor("--su", "--fallback-su", theme === "dark" ? "#36d399" : "#10b981");
    const errorColor = getColor("--er", "--fallback-er", theme === "dark" ? "#f87272" : "#ef4444");
    const textColor = getColor("--bc", "--fallback-bc", theme === "dark" ? "#ffffff" : "#000000");
    
    setColors({
      success: successColor,
      error: errorColor,
      text: textColor
    });
  }, [theme]);

  const completedCount = items.filter((item) => item.completed).length;
  const incompleteCount = items.filter((item) => !item.completed).length;

  const data = [
    { name: t("completed"), value: completedCount },
    { name: t("incomplete"), value: incompleteCount },
  ];

  const COLORS = [colors.success, colors.error];

  // Don't show chart if no items
  if (items.length === 0) {
    return null;
  }

  // Custom tooltip with better styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-base-100 border border-base-300 rounded-lg shadow-lg p-3">
          <p className="text-base-content font-semibold">{data.name}</p>
          <p className="text-base-content/70">
            {t("totalItems")}: <span className="font-bold">{data.value}</span>
          </p>
          <p className="text-base-content/70">
            {((data.value / (completedCount + incompleteCount)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 w-full max-w-md mx-auto mt-6">
      <div className="card-body p-4 sm:p-6">
        <h3 className="card-title text-lg mb-4 justify-center">
          {t("itemsOverview")}
        </h3>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: colors.text }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ItemsPieChart;

