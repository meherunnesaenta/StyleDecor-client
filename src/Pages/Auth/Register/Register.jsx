import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      // ১. Firebase-এ user register করো
      const result = await registerUser(data.email, data.password);
      const user = result.user;

      // ২. Image upload to ImgBB
      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append('image', profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.display_url; // সঠিক field

      // ৩. Firebase profile update
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL
      };
      await updateUserProfile(userProfile);

      // ৪. Database-এ user save করো (public route, axiosSecure না লাগে)
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
        role: 'user' // optional
      };

      const dbRes = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

      if (dbRes.data.insertedId || dbRes.data.acknowledged) {
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully!',
          icon: 'success',
          timer: 2000
        });
        navigate(location.state?.from || '/');
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = 'Something went wrong!';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-100 flex items-center justify-center px-4 pb-30">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl relative z-10 pt-5">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary">StyleDecor</h2>
            <p className="text-xl mt-2 text-base-content/70">Create Your Account</p>
            <p className="text-sm mt-1 text-base-content/60">Join us to book beautiful decorations</p>
            <div className="flex items-center justify-center mt-6">
              <div className="border-t border-primary/20 w-20"></div>
              <div className="mx-4 text-primary/40">✦</div>
              <div className="border-t border-primary/20 w-20"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your full name"
                className="input input-bordered w-full"
              />
              {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Profile Photo</span>
              </label>
              <input
                type="file"
                {...register('photo', { required: 'Profile photo is required' })}
                className="file-input file-input-bordered w-full"
                accept="image/*"
              />
              {errors.photo && <p className="text-error text-sm mt-1">{errors.photo.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="your@email.com"
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                    message: 'Password must contain uppercase, lowercase, number & special character'
                  }
                })}
                placeholder="••••••••"
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6 text-white">
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-base-content/70">
            Already have an account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="link link-hover text-secondary font-medium hover:text-secondary/80"
            >
              Login Here
            </Link>
          </p>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;