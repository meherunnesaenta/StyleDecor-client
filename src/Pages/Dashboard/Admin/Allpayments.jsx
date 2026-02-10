import { useEffect, useState } from "react";
import Heading from "../../../components/Shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Allpayments = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/admin/payments")
      .then(res => {
        console.log("Raw payment data from backend:", res.data);
        setPayments(res.data)
      });
  }, [axiosSecure]);

  return (
<div className="p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100/80 min-h-screen">
  <Heading
    title="Payment History"
    subtitle="Track all your completed transactions at a glance"
    className="mb-10"
  />

  <div className="overflow-x-auto rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-primary/10">
    <table className="table table-lg">
      {/* Header */}
      <thead>
        <tr className="bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-white">
          <th className="text-base font-semibold">#</th>
          <th className="text-base font-semibold">Transaction ID</th>
          <th className="text-base font-semibold">User</th>
          <th className="text-base font-semibold">Service</th>
          <th className="text-base font-semibold text-center">Amount (USD)</th>
          <th className="text-base font-semibold">Date</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200/50">
        {payments.map((p, index) => (
          <tr
            key={p._id}
            className={`
              group transition-all duration-300 ease-out
              hover:bg-gradient-to-r hover:from-indigo-50/70 hover:to-purple-50/70
              hover:shadow-md hover:scale-[1.005] hover:-translate-y-px
              ${index % 2 === 0 ? 'bg-base-100/40' : 'bg-white/60'}
            `}
          >
            <td className="font-medium text-primary/80">{index + 1}</td>

            <td className="font-mono text-xs text-gray-600 truncate max-w-[180px]">
              {p.stripeSessionId?.slice(0, 8)}...{p.stripeSessionId?.slice(-6)}
            </td>

            <td>
              <div className="flex flex-col">
                <span className="font-semibold text-base-content">{p.customerName || 'Guest'}</span>
                <span className="text-xs text-gray-500 opacity-80">{p.customerEmail}</span>
              </div>
            </td>

            <td className="font-medium text-neutral">
              {p.serviceName || 'Service Payment'}
            </td>

            <td className="text-center">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-100/80 text-green-700 font-bold shadow-sm">
                ${Number(p.amountUSD || 0).toFixed(2)}
                <span className="text-xs opacity-70">USD</span>
              </div>
            </td>

            <td className="text-gray-700">
              {p.paidAt 
                ? new Date(p.paidAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—'}
            </td>
          </tr>
        ))}

        {payments.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center py-16 text-gray-500">
              <div className="flex flex-col items-center gap-3 opacity-70">
                <svg 
                  className="w-16 h-16 stroke-current" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <p className="text-lg font-medium">No payments found yet</p>
                <p className="text-sm">Your transaction history will appear here</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Optional: Summary cards at bottom */}
  {payments.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div className="stats shadow-lg bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-200/30">
        <div className="stat">
          <div className="stat-title text-purple-700">Total Payments</div>
          <div className="stat-value text-3xl text-purple-800">
            ${payments.reduce((sum, p) => sum + Number(p.amountUSD || 0), 0).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="stats shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200/30">
        <div className="stat">
          <div className="stat-title text-green-700">Latest Payment</div>
          <div className="stat-value text-3xl text-green-800">
            ${Number(payments[0]?.amountUSD || 0).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="stats shadow-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/30">
        <div className="stat">
          <div className="stat-title text-blue-700">Transaction Count</div>
          <div className="stat-value text-3xl text-blue-800">{payments.length}</div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default Allpayments;
