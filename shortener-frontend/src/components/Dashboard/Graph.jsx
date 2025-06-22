import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ myUrlList }) => {
  const labels = myUrlList?.map(
    (item) => `${item.shortUrl}\n${item.clickDate}`
  ) || [];
  const userPerDay = myUrlList?.map((item) => item.clickCount) || [];

  const data = {
    labels: labels.length > 0 ? labels : Array(12).fill(""),
    datasets: [
      {
        label: "Total Clicks",
        data: userPerDay.length > 0 ? userPerDay : Array(12).fill(0),
        backgroundColor: "#3b82f6",
        borderColor: "#1D2327",
        fill: true,
        barThickness: 30,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Clicks: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Clicks",
          font: { size: 16, weight: "bold" },
        },
      },
      x: {
        ticks: {
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.split("\n");
          },
        },
        title: {
          display: true,
          text: "Short URL & Date",
          font: { size: 16, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
