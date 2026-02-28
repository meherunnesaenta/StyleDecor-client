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
    <div className="p-6 md:p-10 bg-base min-h-screen">
      <Heading
        title={`Payment History: (${payments.length})`}
        subtitle="Track all your completed transactions at a glance"
        center={true}
      />

      <div className="rounded-2xl border bg-base backdrop-blur-xl shadow-2xl shadow-primary/10 p-2">
        <div className="overflow-hidden md:overflow-x-auto">
          <table className="table table-lg md:table-fixed w-full">
            {/* Header */}
            <thead className="hidden md:table-header-group bg-base text-base">
              <tr>
                <th className="text-base font-semibold">#</th>
                <th className="text-base font-semibold">Transaction ID</th>
                <th className="text-base font-semibold">User</th>
                <th className="text-base font-semibold">Service</th>
                <th className="text-base font-semibold text-center">Amount (USD)</th>
                <th className="text-base font-semibold">Date</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="flex flex-col gap-4 md:table-row-group">
              {payments.length === 0 ? (
                <tr className="md:table-row flex flex-col p-4 md:p-0 items-center justify-center">
                  <td colSpan={6} className="text-center py-16 text-base">
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
              ) : (
                payments.map((p, index) => (
                  <tr
                    key={p._id}
                    className="group transition-all duration-300 ease-out hover:bg-primary hover:text-base hover:shadow-md hover:scale-[1.005] hover:-translate-y-px flex flex-col md:table-row rounded-xl md:rounded-none p-4 md:p-0"
                  >
                    <td className="font-medium text-primary/80 md:table-cell" data-label="#">
                      {index + 1}
                    </td>

                    <td className="font-mono text-xs text-base truncate max-w-[180px] md:table-cell" data-label="Transaction ID">
                      {p.stripeSessionId?.slice(0, 8)}...{p.stripeSessionId?.slice(-6)}
                    </td>

                    <td className="md:table-cell" data-label="User">
                      <div className="flex flex-col">
                        <span className="font-semibold text-base-content">{p.customerName || 'Guest'}</span>
                        <span className="text-xs text-base opacity-80">{p.customerEmail}</span>
                      </div>
                    </td>

                    <td className="font-medium text-neutral text-secondary md:table-cell" data-label="Service">
                      {p.serviceName || 'Service Payment'}
                    </td>

                    <td className="text-center md:table-cell" data-label="Amount">
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-base text-base font-bold shadow-sm">
                        ${Number(p.amountUSD || 0).toFixed(2)}
                        <span className="text-xs opacity-70">USD</span>
                      </div>
                    </td>

                    <td className="text-base md:table-cell" data-label="Date">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional: Summary cards at bottom */}
      {payments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="stats shadow-lg bg-secondary/30 border ">
            <div className="stat">
              <div className="stat-title text-primary">Total Payments</div>
              <div className="stat-value text-3xl text-primary">
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
              <div className="stat-title text-primary">Transaction Count</div>
              <div className="stat-value text-3xl text-primary">{payments.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allpayments;
