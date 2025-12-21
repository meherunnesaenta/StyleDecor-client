import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { imageUpload } from '../../Utils';
import Loading from '../Loading/Loading';
import ErrorPage from '../../Pages/Error/ErrorPage';

const AddServiceForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Mutation for creating new service
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => 
      await axiosSecure.post('/services', payload),
    onSuccess: (data) => {
      toast.success('Decoration service added successfully! 🎉');
      mutationReset();
      navigate('/dashboard/manage-services');
    },
    onError: (error) => {
      toast.error('Failed to add service. Please try again.');
      console.error('Error adding service:', error);
    },
    retry: 2,
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { 
      service_name, 
      cost, 
      unit, 
      category, 
      description, 
      estimated_time,
      serviceMode, 
      image 
    } = data;
    
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      
     
      const serviceData = {
        
        service_name,
        cost: Number(cost),
        unit,
        category,
        description,
        createdByEmail: user?.email,
        
        
        serviceMode, 
        
        estimated_time,
        image: imageUrl,
        
        // System Fields
        createdAt: new Date(),
        isActive: true,
        features: [],
        rating: 0,
        totalBookings: 0
      };

      await mutateAsync(serviceData);
      reset();
    } catch (err) {
      console.error('Error in form submission:', err);
      toast.error('Something went wrong!');
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage/>;

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-6'>
      <div className='w-full max-w-4xl'>
        <h2 className='text-3xl font-bold text-center mb-8 text-primary'>
          Add New Decoration Service
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Service Name */}
              <div className='space-y-2'>
                <label htmlFor='service_name' className='block text-gray-700 font-medium'>
                  Service Name *
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-lg bg-white'
                  id='service_name'
                  type='text'
                  placeholder='e.g., Wedding Venue Decoration'
                  {...register('service_name', {
                    required: 'Service name is required',
                    maxLength: {
                      value: 100,
                      message: 'Name is too long',
                    },
                  })}
                />
                {errors.service_name && (
                  <p className='text-sm text-red-500 mt-1'>
                    {errors.service_name.message}
                  </p>
                )}
              </div>


              <div className='space-y-2'>
                <label htmlFor='serviceMode' className='block text-gray-700 font-medium'>
                  Service Type *
                </label>
                <select
                  className='w-full px-4 py-3 border border-primary focus:outline-primary rounded-lg bg-white'
                  {...register('serviceMode', { 
                    required: 'Service type is required' 
                  })}
                >
                  <option value=''>Select Service Type</option>
                  <option value='on-site'>On-site Decoration Service</option>
                  <option value='in-studio'>In-studio Consultation</option>
                </select>
                {errors.serviceMode && (
                  <p className='text-sm text-red-500 mt-1'>
                    {errors.serviceMode.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className='space-y-2'>
                <label htmlFor='category' className='block text-gray-700 font-medium'>
                  Category *
                </label>
                <select
                  className='w-full px-4 py-3 border border-primary focus:outline-primary rounded-lg bg-white'
                  {...register('category', { 
                    required: 'Category is required' 
                  })}
                >
                  <option value=''>Select Category</option>
                  <option value='wedding'>Wedding</option>
                  <option value='home'>Home Decoration</option>
                  <option value='office'>Office/Corporate</option>
                  <option value='birthday'>Birthday Party</option>
                  <option value='seminar'>Seminar/Conference</option>
                  <option value='other'>Other Ceremonies</option>
                </select>
                {errors.category && (
                  <p className='text-sm text-red-500 mt-1'>
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Cost & Unit */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label htmlFor='cost' className='block text-gray-700 font-medium'>
                    Cost (BDT) *
                  </label>
                  <input
                    className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-lg bg-white'
                    id='cost'
                    type='number'
                    min='0'
                    placeholder='e.g., 50000'
                    {...register('cost', {
                      required: 'Cost is required',
                      min: { 
                        value: 0, 
                        message: 'Cost must be positive' 
                      },
                    })}
                  />
                  {errors.cost && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.cost.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label htmlFor='unit' className='block text-gray-700 font-medium'>
                    Unit *
                  </label>
                  <select
                    className='w-full px-4 py-3 border border-primary focus:outline-primary rounded-lg bg-white'
                    {...register('unit', { 
                      required: 'Unit is required' 
                    })}
                  >
                    <option value=''>Select Unit</option>
                    <option value='per-event'>Per Event</option>
                    <option value='per-sq-ft'>Per Square Feet</option>
                    <option value='per-floor'>Per Floor</option>
                    <option value='per-meter'>Per Meter</option>
                    <option value='per-hour'>Per Hour</option>
                    <option value='per-day'>Per Day</option>
                  </select>
                  {errors.unit && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.unit.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Estimated Time */}
              <div className='space-y-2'>
                <label htmlFor='estimated_time' className='block text-gray-700 font-medium'>
                  Estimated Time
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-primary focus:outline-primary rounded-lg bg-white'
                  id='estimated_time'
                  type='text'
                  placeholder='e.g., 3-5 hours, 1 day'
                  {...register('estimated_time')}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              {/* Description */}
              <div className='space-y-2'>
                <label htmlFor='description' className='block text-gray-700 font-medium'>
                  Description *
                </label>
                <textarea
                  id='description'
                  rows='4'
                  className='block rounded-lg w-full px-4 py-3 text-gray-800 border border-primary bg-white focus:outline-primary'
                  placeholder='Describe the service details, what includes, special features...'
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 50,
                      message: 'Description should be at least 50 characters',
                    },
                  })}
                ></textarea>
                {errors.description && (
                  <p className='text-sm text-red-500 mt-1'>
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className='space-y-2'>
                <label className='block text-gray-700 font-medium'>
                  Service Image *
                </label>
                <div className='border-2 border-dashed border-secondary rounded-lg p-6 text-center hover:border-primary transition-colors'>
                  <div className='flex flex-col items-center'>
                    <label className='cursor-pointer'>
                      <input
                        className='hidden'
                        type='file'
                        accept='image/*'
                        {...register('image', {
                          required: 'Service image is required',
                        })}
                      />
                      <div className='bg-primary hover:bg-secondary text-white font-medium py-2 px-6 rounded-lg transition-colors'>
                        Choose Image
                      </div>
                      <p className='text-sm text-gray-500 mt-2'>
                        Upload service preview image (JPEG, PNG, WebP)
                      </p>
                    </label>
                  </div>
                  {errors.image && (
                    <p className='text-sm text-red-500 mt-2'>
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={isPending}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                    isPending 
                      ? 'bg-primary cursor-not-allowed' 
                      : 'bg-primary hover:bg-secondary'
                  }`}
                >
                  {isPending ? (
                    <span className='flex items-center justify-center'>
                      <TbFidgetSpinner className='animate-spin mr-2' />
                      Adding Service...
                    </span>
                  ) : (
                    'Add Service'
                  )}
                </button>
                
                <p className='text-sm text-gray-500 mt-3 text-center'>
                  * Required fields
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;