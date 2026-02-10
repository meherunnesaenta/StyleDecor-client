import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const BecomeDecoratorModal = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const riderRegion = useWatch({ control, name: 'region' });

  
  const serviceCenters = [
    { region: "Dhaka Division", district: "Dhaka", city: "Dhaka", covered_area: ["Uttara", "Gulshan", "Banani", "Dhanmondi", "Mohammadpur", "Mirpur", "Bashundhara", "Baridhara"] },
    { region: "Dhaka Division", district: "Gazipur", city: "Gazipur", covered_area: ["Tong i", "Gazipur Sadar", "Kaliakair", "Sreepur"] },
    { region: "Chattogram Division", district: "Chattogram", city: "Chattogram", covered_area: ["Agrabad", "Halishahar", "Pahartali", "Khulshi"] },
    { region: "Rajshahi Division", district: "Rajshahi", city: "Rajshahi", covered_area: ["Rajshahi City Center", "Boalia"] },
    { region: "Khulna Division", district: "Khulna", city: "Khulna", covered_area: ["Khulna City", "Sonadanga"] },
    { region: "Sylhet Division", district: "Sylhet", city: "Sylhet", covered_area: ["Sylhet City", "Zindabazar"] },
  ];

  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const districtsByRegion = (region) => {
    if (!region) return [];
    const filtered = serviceCenters.filter(c => c.region === region);
    return [...new Set(filtered.map(d => d.district))];
  };

const handleDecoratorApplication = (data) => {
  const applicationData = {
    ...data,
    email: user?.email,
    name: user?.displayName || data.fullName,
    appliedAt: new Date(),
    status: 'pending'
  };

  console.log("Decorator Application:", applicationData);

axiosSecure.post('/decorator', applicationData)
  .then(res => {
    if (res.data.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Application Submitted!",
        text: "We will review and contact you soon.",
        showConfirmButton: false,
        timer: 3500
      });
    }
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Failed to Submit',
      text: err?.response?.data?.message || 'Something went wrong.'
    });
  });
}

return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Become a Professional Decorator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join StyleDecor and turn your creativity into beautiful spaces across Bangladesh.
          </p>
          <p className="text-lg text-primary font-medium mt-4">
            We are looking for talented decorators in our active service areas!
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit(handleDecoratorApplication)} 
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - Personal & Contact */}
            <fieldset className="space-y-6">
              <legend className="text-2xl font-semibold text-primary mb-6">
                Personal Information
              </legend>

              {/* Full Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Full name is required' })}
                  defaultValue={user?.displayName || ''}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="text-error text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Email (auto-filled) */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>
                <input
                  type="tel"
                  {...register('phone', { 
                    required: 'Phone is required',
                    pattern: { value: /^(01[3-9]\d{8})$/, message: 'Invalid Bangladeshi number (11 digits)' }
                  })}
                  className="input input-bordered w-full"
                  placeholder="01XXXXXXXXX"
                />
                {errors.phone && <p className="text-error text-sm mt-1">{errors.phone.message}</p>}
              </div>

              {/* Region (Service Area) */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Preferred Service Region</span>
                </label>
                <select 
                  {...register('region', { required: 'Region is required' })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>Select your main working region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>{r}</option>
                  ))}
                </select>
                {errors.region && <p className="text-error text-sm mt-1">{errors.region.message}</p>}
              </div>

              {/* District (Dynamic) */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Preferred District</span>
                </label>
                <select 
                  {...register('district', { required: 'District is required' })}
                  className="select select-bordered w-full"
                  disabled={!riderRegion}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {riderRegion ? 'Select district' : 'Select region first'}
                  </option>
                  {riderRegion && districtsByRegion(riderRegion).map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="text-error text-sm mt-1">{errors.district.message}</p>}
              </div>
            </fieldset>

            {/* Right Column - Professional Info */}
            <fieldset className="space-y-6">
              <legend className="text-2xl font-semibold text-primary mb-6">
                Professional Details
              </legend>

              {/* Experience */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Years of Experience</span>
                </label>
                <input
                  type="number"
                  {...register('experience', { 
                    required: 'Experience is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  })}
                  className="input input-bordered w-full"
                  placeholder="e.g. 4"
                />
                {errors.experience && <p className="text-error text-sm mt-1">{errors.experience.message}</p>}
              </div>

              {/* Portfolio */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Portfolio Link (Website / Behance / Instagram)</span>
                </label>
                <input
                  type="url"
                  {...register('portfolio', { 
                    required: 'Portfolio link is required',
                    pattern: { value: /^(https?:\/\/)/, message: 'Must be a valid URL' }
                  })}
                  className="input input-bordered w-full"
                  placeholder="https://your-portfolio.com"
                />
                {errors.portfolio && <p className="text-error text-sm mt-1">{errors.portfolio.message}</p>}
              </div>

              {/* Specialization */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Main Specialization</span>
                </label>
                <select 
                  {...register('specialization', { required: 'Specialization is required' })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>Select your expertise</option>
                  <option value="Residential">Residential Interior</option>
                  <option value="Commercial">Commercial & Office</option>
                  <option value="Event">Event & Wedding Decoration</option>
                  <option value="Minimalist">Minimalist & Modern</option>
                  <option value="Luxury">Luxury & Premium</option>
                  <option value="Others">Others</option>
                </select>
                {errors.specialization && <p className="text-error text-sm mt-1">{errors.specialization.message}</p>}
              </div>

              {/* Bio */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">About Your Work / Experience</span>
                </label>
                <textarea
                  {...register('bio', { 
                    required: 'Please write something about yourself',
                    minLength: { value: 50, message: 'At least 50 characters' }
                  })}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Describe your style, past projects, why you want to join StyleDecor..."
                />
                {errors.bio && <p className="text-error text-sm mt-1">{errors.bio.message}</p>}
              </div>
            </fieldset>
          </div>

          {/* Submit */}
          <div className="mt-12 text-center">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg px-16 text-white shadow-lg"
            >
              Submit Decorator Application
            </button>
            <p className="text-sm text-gray-600 mt-4">
              We review all applications carefully. Expect a response within 7-14 days.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeDecoratorModal;