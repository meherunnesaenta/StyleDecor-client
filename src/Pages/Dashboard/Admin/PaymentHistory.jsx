import { useEffect, useState } from "react";
import Heading from "../../../components/Shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/my-payments")
      .then(res => {
        console.log("Raw payment data from backend:", res.data);
        setPayments(res.data)
      });
  }, [axiosSecure]);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <Heading
        title="Payment History"
        subtitle="All completed transactions overview"
      />

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg mt-8">
        <table className="table">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Transaction</th>
              <th>User</th>
              <th>Service</th>
              <th>Amount ($)</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td className="font-mono text-xs">{p.stripeSessionId}</td>
                <td>
                  <p className="font-semibold">{p.customerName}</p>
                  <p className="text-xs text-gray-500">{p.customerEmail}</p>
                </td>
                <td>{p.serviceName}</td>
                <td className="font-bold text-green-600">
                  ${Number(p.amountUSD || 0).toFixed(2)}
                </td>
                <td>{new Date(p.paidAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
