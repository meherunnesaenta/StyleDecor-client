import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const BookService = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ধরে নিচ্ছি তুমি services/packages server থেকে load করবে (useLoaderData বা useQuery)
  // Example data structure
  const decorationPackages = [
    { category: 'Wedding', name: 'Basic Wedding', price: 50000, description: 'Stage + Lighting' },
    { category: 'Wedding', name: 'Premium Wedding', price: 100000, description: 'Full venue + Floral' },
    { category: 'Home', name: 'Living Room Decor', price: 30000 },
    { category: 'Home', name: 'Full Home Makeover', price: 150000 },
    { category: 'Corporate', name: 'Office Seminar', price: 40000 },
  ];

  const categories = [...new Set(decorationPackages.map(p => p.category))];

  const selectedCategory = useWatch({ control, name: 'category' });

  const packagesByCategory = (category) => {
    return decorationPackages.filter(p => p.category === category);
  };

  const onSubmit = (data) => {
    console.log(data);

    // Cost calculation
    const selectedPackage = packagesByCategory(data.category).find(p => p.name === data.packageName);
    let baseCost = selectedPackage?.price || 0;

    // Add-ons cost
    let addOnsCost = 0;
    if (data.addOns?.lighting) addOnsCost += 10000;
    if (data.addOns?.floral) addOnsCost += 15000;
    if (data.addOns?.theme) addOnsCost += 20000;

    const totalCost = baseCost + addOnsCost;

    data.totalCost = totalCost;
    data.bookingStatus = 'pending';
    data.bookedBy = user?.email;
    data.bookingDateTime = new Date().toISOString();

    Swal.fire({
      title: "Confirm Booking?",
      text: `Total Cost: ${totalCost} BDT. Proceed to payment?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book Now!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/bookings', data)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Booking Created! Please complete payment.",
                showConfirmButton: false,
                timer: 2500
              });
              navigate('/dashboard/my-bookings');
            }
          })
          .catch(err => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-5xl font-bold text-center text-primary mb-12">
        Book Your Decoration Service
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 shadow-xl rounded-2xl p-8">
        {/* Service Category & Package */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="label text-lg font-medium">Service Category</label>
            <select 
              {...register('category', { required: 'Category is required' })} 
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="label text-lg font-medium">Package</label>
            <select 
              {...register('packageName', { required: 'Package is required' })} 
              className="select select-bordered w-full"
              defaultValue=""
              disabled={!selectedCategory}
            >
              <option value="" disabled>Select Package</option>
              {selectedCategory && packagesByCategory(selectedCategory).map(pkg => (
                <option key={pkg.name} value={pkg.name}>
                  {pkg.name} - {pkg.price.toLocaleString()} BDT
                </option>
              ))}
            </select>
            {errors.packageName && <p className="text-error text-sm mt-1">{errors.packageName.message}</p>}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="label text-lg font-medium">Preferred Date</label>
            <input 
              type="date" 
              {...register('bookingDate', { required: 'Date is required' })} 
              className="input input-bordered w-full" 
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.bookingDate && <p className="text-error text-sm mt-1">{errors.bookingDate.message}</p>}
          </div>

          <div>
            <label className="label text-lg font-medium">Preferred Time</label>
            <select {...register('bookingTime', { required: 'Time is required' })} className="select select-bordered w-full">
              <option value="">Select Time</option>
              <option>Morning (9AM - 12PM)</option>
              <option>Afternoon (12PM - 5PM)</option>
              <option>Evening (5PM - 9PM)</option>
            </select>
            {errors.bookingTime && <p className="text-error text-sm mt-1">{errors.bookingTime.message}</p>}
          </div>
        </div>

        {/* Service Mode */}
        <div className="mb-8">
          <label className="label text-lg font-medium">Service Mode</label>
          <div className="flex gap-8">
            <label className="cursor-pointer">
              <input type="radio" {...register('serviceMode', { required: true })} value="consultation" className="radio radio-primary" />
              <span className="ml-2">In-Studio Consultation</span>
            </label>
            <label className="cursor-pointer">
              <input type="radio" {...register('serviceMode', { required: true })} value="on-site" className="radio radio-primary" defaultChecked />
              <span className="ml-2">On-Site Decoration</span>
            </label>
          </div>
        </div>

        {/* Venue Address */}
        <div className="mb-8">
          <label className="label text-lg font-medium">Venue Address</label>
          <textarea 
            {...register('venueAddress', { required: 'Address is required' })} 
            className="textarea textarea-bordered w-full h-32" 
            placeholder="Full address of the venue"
          />
          {errors.venueAddress && <p className="text-error text-sm mt-1">{errors.venueAddress.message}</p>}
        </div>

        {/* Add-ons */}
        <div className="mb-8">
          <label className="label text-lg font-medium">Add-ons (Optional)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="cursor-pointer flex items-center gap-3">
              <input type="checkbox" {...register('addOns.lighting')} className="checkbox checkbox-primary" />
              <span>Extra Lighting (+10,000 BDT)</span>
            </label>
            <label className="cursor-pointer flex items-center gap-3">
              <input type="checkbox" {...register('addOns.floral')} className="checkbox checkbox-primary" />
              <span>Floral Arrangements (+15,000 BDT)</span>
            </label>
            <label className="cursor-pointer flex items-center gap-3">
              <input type="checkbox" {...register('addOns.theme')} className="checkbox checkbox-primary" />
              <span>Custom Theme Enhancement (+20,000 BDT)</span>
            </label>
          </div>
        </div>

        {/* User Info Auto-fill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="label">Your Name</label>
            <input 
              type="text" 
              defaultValue={user?.displayName || ''} 
              readOnly 
              className="input input-bordered w-full bg-base-200" 
            />
          </div>
          <div>
            <label className="label">Your Email</label>
            <input 
              type="email" 
              defaultValue={user?.email || ''} 
              readOnly 
              className="input input-bordered w-full bg-base-200" 
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg px-12">
            Confirm Booking & Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookService;