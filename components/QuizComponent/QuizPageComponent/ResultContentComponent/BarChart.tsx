'use client'
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { useFetchAssessmentDetailsQuery } from "@/redux/feature/assessment/result";
import { useParams } from "next/navigation";

type Dimension = {
  dimension_name: string;
  score: number;
};

type ChartData = {
  label: string;
  score: number;
  color: string;
};

type BarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { color?: string };
};

export const PersonalityBarChart = () => {
  const params = useParams();

  const resultTypeString =
    typeof params.resultType === "string" ? params.resultType : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const { data: response, error, isLoading } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: resultTypeString,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !response) return <p>Error loading data...</p>;

  const dimensions: Dimension[] = response?.[0]?.dimensions || [];

  // Map dimensions into chart data format
  const chartData: ChartData[] = dimensions.map((dim: Dimension, index: number) => ({
    label: dim.dimension_name,
    score: dim.score,
    color: [
      "#FF6384", // Red
      "#36A2EB", // Blue
      "#FFCE56", // Yellow
      "#4BC0C0", // Teal
      "#9966FF", // Purple
      "#FF9F40", // Orange
    ][index % 6], // Cycle through colors
  }));

  // Custom bar shape for dynamic coloring
  const CustomBar = (props: BarProps) => {
    const { x, y, width, height } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.payload?.color}
        radius={[4, 4, 0, 0]} // Rounded top corners
      />
    );
  };

  // Custom legend
  const renderCustomLegend = () => (
    <div className="w-full flex flex-wrap space-y-2">
      {chartData.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-sm">{entry.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Personality Dimensions
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="col-span-2">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <Tooltip />
              <Bar
                dataKey="score"
                shape={(props: BarProps) => <CustomBar {...props} />}
                name="Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="col-span-1">{renderCustomLegend()}</div>
      </div>
    </div>
  );
};
