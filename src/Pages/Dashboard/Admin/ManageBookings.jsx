import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/Shared/Heading";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const decoratorModalRef = useRef();

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["manage-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-bookings");
      return res.data;
    },
  });

  const {
    data: decorators = [],
    isLoading: decoratorsLoading,
    refetch: refetchDecorators,
  } = useQuery({
    queryKey: ["available-decorators", selectedBooking?.location],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const district = selectedBooking?.location?.split(",")[1]?.trim() || "";
      const res = await axiosSecure.get(
        `/decorators?status=approved&district=${district}&workStatus=available`
      );
      return res.data;
    },
  });

  const openAssignDecoratorModal = (booking) => {
    setSelectedBooking(booking);
    decoratorModalRef.current.showModal();
  };

const handleAssignDecorator = async (decorator) => {
  const assignInfo = {
    decoratorId: decorator._id,
    decoratorEmail: decorator.email,
    decoratorName: decorator.name,
    bookingId: selectedBooking._id,
    assignedAt: new Date().toISOString(),
  };

  try {
    // ১. Booking assign
    const assignRes = await axiosSecure.patch(
      `/bookings/${selectedBooking._id}/assign-decorator`,
      assignInfo
    );

    if (assignRes.data?.modifiedCount > 0 || assignRes.data?.success) {
      // ২. Decorator busy করা (ফেল করলেও booking assign হবে)
      try {
        await axiosSecure.patch(`/decorators/${decorator._id}/work-status`, {
          workStatus: 'busy'
        });
        console.log('Decorator set to busy');
      } catch (decoratorErr) {
        console.warn('Failed to set decorator busy (optional):', decoratorErr);
      }

      decoratorModalRef.current.close();
      refetchBookings();
      refetchDecorators();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Decorator ${decorator.name} assigned!`,
        showConfirmButton: false,
        timer: 1800,
      });
    }
  } catch (err) {
    console.error("Assign error:", err);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err?.response?.data?.message || "Something went wrong",
    });
  }
};

  if (bookingsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <Heading
        title={`Manage Bookings (${bookings.length})`}
        subtitle="Oversee all bookings and assign decorators"
      />

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg mt-8 border border-base-200">
        <table className="table table-zebra table-lg">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b, index) => (
                <tr key={b._id} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold">{b.customerName || "Guest"}</span>
                      <span className="text-xs text-gray-500">{b.customerEmail}</span>
                    </div>
                  </td>
                  <td className="font-medium">{b.serviceName}</td>
                  <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                  <td>{b.location || "N/A"}</td>
                  <td className="font-bold text-green-600">
                    ${Number(b.paidAmountUSD || 0).toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`badge badge-lg ${b.status === "paid" || b.status === "assigned"
                          ? "badge-success"
                          : b.status === "pending"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                    >
                      {b.status?.toUpperCase() || "Pending"}
                    </span>
                  </td>
                  <td>
                    {/* Work Status badge */}
                    <span
                      className={`btn btn-lg font-semibold ${b.workStatus === "assigned" ? "btn-info" :
                          b.workStatus === "in-progress" ? "btn-warning" :
                            b.workStatus === "completed" ? "btn-success" :
                              "btn-neutral"
                        }`}
                    >
                      {b.workStatus ? b.workStatus.toUpperCase() : "Not Started"}
                    </span>
                  </td>
                  <td className="space-x-2">

                    {(b.status === "paid" || b.status === "pending") && !b.decoratorId && (
                      <button
                        onClick={() => openAssignDecoratorModal(b)}
                        className="btn  btn-primary"
                      >
                        Assign Decorator
                      </button>
                    )}

                    {b.decoratorId && (
                      <span className="badge badge-info">
                        Assigned: {b.decoratorName || "Decorator"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Decorator Modal */}
      <dialog ref={decoratorModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-xl mb-4">
            Assign Decorator - {decorators.length} Available
          </h3>

          {decoratorsLoading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : decorators.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No available decorators in this area right now.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {decorators.map((decorator, i) => (
                    <tr key={decorator._id}>
                      <th>{i + 1}</th>
                      <td>{decorator.name}</td>
                      <td>{decorator.email}</td>
                      <td>{decorator.specialization || "General"}</td>
                      <td>{decorator.experience || 0} years</td>
                      <td>
                        <button
                          onClick={() => handleAssignDecorator(decorator)}
                          className="btn btn-sm btn-primary"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBookings;