import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const COLORS = {
  pending: '#f59e0b',      // amber
  processing: '#3b82f6',   // blue
  shipped: '#8b5cf6',      // violet
  delivered: '#10b981',    // emerald
  cancelled: '#ef4444',    // red
  returned: '#ec4899'      // pink
};

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [], isLoading, error } = useQuery({
    queryKey: ['delivery-status-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/work-status/starts');
      return res.data;
    }
  });

  // Prepare data for Pie Chart
  const pieChartData = deliveryStats.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1), 
    value: item.count,
    fill: COLORS[item._id] || '#64748b' // Default gray if status not in COLORS
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-2xl mx-auto mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading stats: {error.message || 'Something went wrong'}</span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-3">
          Admin Dashboard
        </h2>
        <p className="text-lg text-base-content/70">
          Overview of parcel delivery statuses • Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
        {deliveryStats.map((stat) => (
          <div
            key={stat._id}
            className="stats shadow-lg bg-base-100 border border-base-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="stat">
              <div className="stat-figure text-primary">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div className="stat-title capitalize text-base-content/70">
                {stat._id}
              </div>
              <div className="stat-value text-3xl font-bold">
                {stat.count}
              </div>
              <div className="stat-desc">
                Parcels
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-6">
            Delivery Status Distribution
          </h3>

          <div className="w-full h-[400px] md:h-[500px]">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                    outerRadius={150}
                    innerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--b1))',
                      border: '1px solid hsl(var(--b2))',
                      borderRadius: '8px',
                      color: 'hsl(var(--bc))'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-base-content/50">
                No delivery stats available yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;