import { useEffect, useState } from "react";
import Heading from "../../../components/Shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/manage-bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <Heading
        title="Manage Bookings"
        subtitle="Admin panel to manage all service bookings"
      />

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg mt-8">
        <table className="table">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>

                <td>
                  <p className="font-semibold">{b.customerName}</p>
                  <p className="text-xs text-gray-500">{b.customerEmail}</p>
                </td>

                <td>{b.serviceName}</td>
                <td>{b.bookingDate}</td>
                <td>{b.location}</td>

                <td>
                  <span className="badge badge-success">
                    Paid
                  </span>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {b.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button className="btn btn-xs btn-info">
                    View
                  </button>
                  <button className="btn btn-xs btn-primary">
                    Assign Decorator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No bookings available
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
