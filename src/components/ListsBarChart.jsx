import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useEffect, useState } from "react";

function ListsBarChart({ lists }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [colors, setColors] = useState({ 
    primary: "#3b82f6", 
    success: "#10b981", 
    error: "#ef4444",
    text: "#000",
    grid: "#e5e7eb"
  });

  // Get colors from CSS variables that adapt to theme
  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // DaisyUI colors - these adapt to light/dark theme
    const getColor = (varName, fallbackVar, defaultValue) => {
      const value = computedStyle.getPropertyValue(varName).trim() || 
                   computedStyle.getPropertyValue(fallbackVar).trim();
      return value || defaultValue;
    };
    
    const primaryColor = getColor("--p", "--fallback-p", theme === "dark" ? "#3b82f6" : "#3b82f6");
    const successColor = getColor("--su", "--fallback-su", theme === "dark" ? "#36d399" : "#10b981");
    const errorColor = getColor("--er", "--fallback-er", theme === "dark" ? "#f87272" : "#ef4444");
    const textColor = getColor("--bc", "--fallback-bc", theme === "dark" ? "#ffffff" : "#000000");
    const gridColor = getColor("--b3", "--fallback-b3", theme === "dark" ? "#374151" : "#e5e7eb");
    
    setColors({
      primary: primaryColor,
      success: successColor,
      error: errorColor,
      text: textColor,
      grid: gridColor
    });
  }, [theme]);

  // Transform lists data for chart
  const chartData = lists.map((list) => ({
    name: list.name.length > 15 ? list.name.substring(0, 15) + "..." : list.name,
    fullName: list.name,
    total: list.items.length,
    completed: list.items.filter((item) => item.completed).length,
    incomplete: list.items.filter((item) => !item.completed).length,
  }));

  // Don't show chart if no lists
  if (lists.length === 0) {
    return null;
  }

  // Custom tooltip with better styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = chartData.find((d) => d.name === label);
      return (
        <div className="bg-base-100 border border-base-300 rounded-lg shadow-lg p-3">
          <p className="text-base-content font-semibold mb-2">{item ? item.fullName : label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-base-content/70" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 w-full mt-6">
      <div className="card-body p-4 sm:p-6">
        <h3 className="card-title text-lg mb-4">{t("listsOverview")}</h3>
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={350} minHeight={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 80,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={colors.grid}
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ 
                  fontSize: 11, 
                  fill: colors.text,
                  fontWeight: 500
                }}
                stroke={colors.text}
              />
              <YAxis 
                tick={{ 
                  fontSize: 12, 
                  fill: colors.text 
                }}
                stroke={colors.text}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: "10px" }}
                iconType="square"
                formatter={(value) => (
                  <span style={{ color: colors.text }}>{value}</span>
                )}
              />
              <Bar 
                dataKey="total" 
                fill={colors.primary} 
                name={t("totalItems")}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="completed" 
                fill={colors.success} 
                name={t("completed")}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="incomplete" 
                fill={colors.error} 
                name={t("incomplete")}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ListsBarChart;

