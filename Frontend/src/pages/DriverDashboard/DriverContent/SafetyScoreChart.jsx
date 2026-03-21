import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const SafetyScoreChart = () => {

  // 🔹 safety trend data
  const safetyData = [
    { month: "Jan", score: 92 },
    { month: "Feb", score: 85 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 82 },
  ];

  // 🔹 violations data
  const violationData = [
    { month: "Jan", v: 1 },
    { month: "Feb", v: 3 },
    { month: "Mar", v: 4 },
    { month: "Apr", v: 2 },
  ];

  // 🔹 pie data
  const riskData = [
    { name: "Safe", value: 75 },
    { name: "Risk", value: 25 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="p-8">

      <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-neutral-700 to-neutral-900 mb-8 text-shadow-sm">
        Driver Analytics
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {/* Safety Trend */}
        <div className="bg-white rounded-2xl shadow p-4 h-72">
          <h3 className="font-semibold mb-3">Safety Score Trend</h3>

          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={safetyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#22c55e"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Violations Chart */}
        <div className="bg-white rounded-2xl shadow p-4 h-72">
          <h3 className="font-semibold mb-3">Monthly Violations</h3>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={violationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="v" fill="#036bfc" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Pie */}
        <div className="bg-white rounded-2xl shadow p-4 h-72">
          <h3 className="font-semibold mb-3">Driver Risk Status</h3>

          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={riskData} dataKey="value" outerRadius={90} label>
                {riskData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default SafetyScoreChart;