"use client";
import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export type ChartJSType = "bar" | "pie" | "line";

interface ChartJSChartProps {
  type: ChartJSType;
  data: any;
  options?: any;
  height?: number;
}

const ChartJSChart: React.FC<ChartJSChartProps> = ({ type, data, options, height = 250 }) => {
  return (
    <div style={{ width: '100%', height }}>
      {type === "bar" && <Bar data={data} options={options} />}
      {type === "pie" && <Pie data={data} options={options} />}
      {type === "line" && <Line data={data} options={options} />}
    </div>
  );
};

export default ChartJSChart; 