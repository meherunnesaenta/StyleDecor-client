import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const DecoratorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios.get('/decorator/work-per-day?email=' + user.email, {
  headers: { Authorization: `Bearer ${user.token}` }
})

      .then(res => {
        console.log("API RESPONSE:", res.data);

        if (!Array.isArray(res.data)) {
          setChartData(null);
          return;
        }

        const labels = res.data.map(item => item._id);
        const values = res.data.map(item => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Completed Projects",
              data: values,
              backgroundColor: "#22c55e",
              borderRadius: 6,
            },
          ],
        });
      })
      .catch(err => {
        console.error("Chart load error:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  if (loading) {
    return <p className="text-center">Loading work statistics...</p>;
  }

  if (!chartData) {
    return (
      <p className="text-center text-gray-500">
        No completed work data available yet.
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border">
      <h3 className="text-xl font-semibold text-primary mb-4">
        📅 Completed Work Per Day
      </h3>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        }}
      />
    </div>
  );
};

export default DecoratorDashboardHome;
