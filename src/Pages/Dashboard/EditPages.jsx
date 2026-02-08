// src/pages/dashboard/EditPages.jsx
import { useLocation, useNavigate, useParams } from 'react-router';
import { useState } from 'react';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditPages = () => {
  const { id } = useParams();
  const { state } = useLocation(); // passed booking data
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    bookingDate: state?.booking?.bookingDate || '',
    location: state?.booking?.location || '',
    // আর যা যা edit করতে চাও (serviceMode, unit ইত্যাদি)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/bookings/${id}`, formData);

      if (res.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Booking updated successfully',
          icon: 'success'
        });
        navigate('/dashboard/my-bookings');
      }
    } catch (err) {
      console.error('Update error:', err);
      Swal.fire({
        title: 'Error',
        text: err?.response?.data?.message || 'Failed to update booking',
        icon: 'error'
      });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Booking</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate.split('T')[0]} // ISO date থেকে date input-এর জন্য
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* আরও ফিল্ড যোগ করতে পারো: serviceMode, unit ইত্যাদি */}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-bookings')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPages;