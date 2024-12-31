import { useEffect, useRef } from "react";
import { Chart, ChartData, ChartOptions } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface TrendingJob {
  month: string;
  label: string;
  count: number;
}

interface ChartJobTrendingProps {
  trendingJobs: TrendingJob[];
}

const ChartJobTrending = ({ trendingJobs }: ChartJobTrendingProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart instance before creating a new one
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Prepare data for the chart
      const labels = trendingJobs.map((job) => job.month); // X-axis labels
      const jobCategoriesData = trendingJobs.map((job) => job.count); // Dataset
      const jobLabels = trendingJobs.map((job) => job.label); // Labels for each point

      // Create new chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels, // Months on the x-axis
          datasets: [
            {
              label: "Job Categories",
              data: jobCategoriesData,
              borderColor: "orange", // Line color
              backgroundColor: "rgba(255, 165, 0, 0.2)", // Fill color for points
              pointBackgroundColor: "orange", // Point background color
              pointBorderColor: "orange", // Point border color
              fill: false, // Do not fill under the line
              borderWidth: 3, // Line thickness
              pointRadius: 6, // Point size
              pointHoverRadius: 8, // Point size on hover
            },
          ],
        } as ChartData,
        options: {
          responsive: true,
          layout: {
            padding: {
              top: 30, // Add space at the top
              bottom: 30, // Add space at the bottom
              right: 80, // Add extra space on the right to prevent truncation
              left: 20,
            },
          },
          plugins: {
            legend: {
              position: "bottom", // Move legend below the chart
            },
            datalabels: {
              display: true, // Enable data labels
              align: "top", // Align labels above the points
              formatter: (_value, context) =>
                jobLabels[context.dataIndex] || "", // Show job labels if available
              font: {
                weight: "bold",
                size: 14,
              },
              color: "#6b7280",
            },
            tooltip: {
              enabled: true,
              callbacks: {
                title: (tooltipItems) => {
                  // Return the month label for the tooltip title
                  return tooltipItems[0].label;
                },
                label: (tooltipItem) => {
                  // Show the job label in the tooltip
                  const jobLabel = jobLabels[tooltipItem.dataIndex];
                  return `${jobLabel}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
              },
              grid: {
                display: true,
              },
            },
            y: {
              title: {
                display: true,
              },
              beginAtZero: true, // Start y-axis at 0
              grid: {
                display: true,
              },
            },
          },
        } as ChartOptions,
        plugins: [ChartDataLabels], // Register ChartDataLabels plugin
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [trendingJobs]);

  return (
    <div className="mt-[50px]">
      <canvas
        ref={chartRef}
        width="400"
        height="200"
        className="lg:w-[600px] bg-white rounded-xl lg:h-[600px] md:w-[400px] md:h-[400px] w-[500px] h-[500px]"
      ></canvas>
    </div>
  );
};

export default ChartJobTrending;
