"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ScoreChartProps {
  score: number;
}

export default function ScoreChart({ score }: ScoreChartProps) {
  const [animatedScore, setAnimatedScore] = useState(score);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const data = [
    { name: "Score", value: animatedScore },
    { name: "Remaining", value: 100 - animatedScore },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 selected:outline-none">
      <div className="w-32 h-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              fill={COLORS[1]}
              startAngle={90}
              endAngle={-270}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">{Math.round(score)}</span>
        </div>
      </div>
    </div>
  );
}
