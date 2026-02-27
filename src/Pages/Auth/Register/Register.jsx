import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import universalIllustration from '../../../assets/login-illustration.png';
import { Logo } from '../../../components/Logo/Logo';
import Button from '../../../components/Shared/Button/Button';

// React Icons
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');

  const handleRegistration = async (data) => {
    setErr('');
    try {
      const result = await registerUser(data.email, data.password);
      const user = result.user;

      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append('image', profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.display_url;

      const userProfile = {
        displayName: data.name,
        photoURL,
      };
      await updateUserProfile(userProfile);

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
        role: 'user',
      };
      const dbRes = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

      if (dbRes.data.insertedId || dbRes.data.acknowledged) {
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(location?.state?.from || '/');
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = 'Something went wrong!';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setErr(errorMessage);
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-cyan-50 via-blue-100 to-indigo-100 relative overflow-hidden">

      <div className="absolute -top-24 -left-24 w-96 h-96  rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-16 w-[600px] h-[600px] bg-blue-400/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl opacity-70"></div>

      {/* Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-10 z-10">
        <img
          src={universalIllustration}
          alt="StyleDecor Illustration"
          className="w-full max-w-3xl h-auto object-contain drop-shadow-2xl animate-float-slow"
        />
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 lg:py-0 lg:px-8 z-20">
        <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-secondary rounded-3xl p-8 md:p-10 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-3">
              <Logo />
            </div>
            <p className="text-gray-600 text-lg">Create Your Account</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  {...register('name', { required: "Name is required" })}
                  placeholder="Jordi"
                  className="w-full px-5 py-3.5 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile Photo</label>
              <input
                type="file" 
                {...register('photo', { required: "Profile photo is required" })}
                className="file-input file-input-bordered w-full rounded-xl  bg-pink-100 border-gray-300 focus:ring-2 focus:ring-secondary"
                accept="image/*"
              />
              {errors.photo && <p className="text-red-500 text-sm mt-1.5">{errors.photo.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { required: "Email is required" })}
                  placeholder="Jordan@gmail.com"
                  className="w-full px-5 py-3.5 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-secondary transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1.5">{errors.password.message}</p>}
            </div>

            {err && <p className="text-red-500 text-center mt-4">{err}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-2xl font-semibold"
            >
              Create Account
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-semibold hover:underline">
              Sign In
            </Link>
          </p>

          {/* OR divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;