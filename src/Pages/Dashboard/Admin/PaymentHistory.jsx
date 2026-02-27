import React, { useEffect, useState } from 'react';
import Heading from '../../../components/Shared/Heading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setIsLoading(true);
    axiosSecure
      .get('/my-payments')
      .then((res) => {
        console.log('Raw payment data from backend:', res.data);
        setPayments(res.data || []);
      })
      .catch((err) => {
        console.error('Payment fetch error:', err);
      })
      .finally(() => setIsLoading(false));
  }, [axiosSecure]);

  // Skeleton for loading
  const SkeletonRow = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 animate-pulse shadow-sm border border-gray-100">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
      <div className="flex justify-between">
        <div className="h-5 bg-gray-200 rounded w-24" />
        <div className="h-5 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100/80 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-14">
        <Heading
          title="Payment History"
          subtitle="Track your completed transactions with full transparency"
          center={true}
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="max-w-6xl mx-auto space-y-6">
          {[...Array(5)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : payments.length === 0 ? (
        /* Empty State */
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-playfair font-semibold text-gray-800 mb-4">
            No Payments Yet
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            Your transaction history will appear here once you complete a payment.
          </p>
          <Link
            to="/services"
            className="
              inline-flex items-center gap-3 px-8 py-4 
              bg-primary text-white font-semibold text-lg 
              rounded-full shadow-lg hover:bg-secondary 
              hover:shadow-xl transition-all duration-300
              transform hover:scale-105
            "
          >
            Explore Services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      ) : (
        /* Payment List - Mobile: Card, Desktop: Table */
        <div className="max-w-7xl mx-auto">
          {/* Mobile Card View (sm and below) */}
          <div className="lg:hidden space-y-6">
            {payments.map((p, index) => (
              <div
                key={p._id}
                className="
                  bg-white/90 backdrop-blur-lg rounded-2xl 
                  shadow-lg border border-gray-100/50 
                  overflow-hidden transition-all duration-300 
                  hover:shadow-xl hover:-translate-y-1
                "
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">
                        {p.serviceName || 'Service Payment'}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {p.customerName || 'Guest'} • {p.customerEmail}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${Number(p.amountUSD || 0).toFixed(2)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {p.paidAt
                          ? new Date(p.paidAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mt-4">
                    Transaction ID:{' '}
                    <span className="font-mono text-xs">
                      {p.stripeSessionId?.slice(0, 8)}...{p.stripeSessionId?.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (lg and above) */}
          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-primary/10">
            <table className="table table-lg w-full">
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

              <tbody className="divide-y divide-gray-200/50">
                {payments.map((p, index) => (
                  <tr
                    key={p._id}
                    className="
                      group transition-all duration-300 ease-out
                      hover:bg-gradient-to-r hover:from-indigo-50/70 hover:to-purple-50/70
                      hover:shadow-md hover:scale-[1.005] hover:-translate-y-px
                      ${index % 2 === 0 ? 'bg-base-100/40' : 'bg-white/60'}
                    "
                  >
                    <td className="font-medium text-primary/80">{index + 1}</td>
                    <td className="font-mono text-xs text-gray-600 truncate max-w-[180px]">
                      {p.stripeSessionId?.slice(0, 8)}...{p.stripeSessionId?.slice(-6)}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-semibold text-base-content">
                          {p.customerName || 'Guest'}
                        </span>
                        <span className="text-xs text-gray-500 opacity-80">
                          {p.customerEmail}
                        </span>
                      </div>
                    </td>
                    <td className="font-medium text-neutral">
                      {p.serviceName || 'Service Payment'}
                    </td>
                    <td className="text-center">
                      <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-green-100/80 text-green-700 font-bold shadow-sm">
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
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          {payments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="stats shadow-lg bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-200/30 rounded-2xl">
                <div className="stat place-items-center">
                  <div className="stat-title text-purple-700">Total Paid</div>
                  <div className="stat-value text-3xl md:text-4xl text-purple-800">
                    $
                    {payments
                      .reduce((sum, p) => sum + Number(p.amountUSD || 0), 0)
                      .toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="stats shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-200/30 rounded-2xl">
                <div className="stat place-items-center">
                  <div className="stat-title text-green-700">Latest Amount</div>
                  <div className="stat-value text-3xl md:text-4xl text-green-800">
                    ${Number(payments[0]?.amountUSD || 0).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="stats shadow-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/30 rounded-2xl">
                <div className="stat place-items-center">
                  <div className="stat-title text-blue-700">Transaction Count</div>
                  <div className="stat-value text-3xl md:text-4xl text-blue-800">
                    {payments.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;