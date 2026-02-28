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
<div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
  <div className="w-full max-w-md sm:max-w-lg bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 sm:p-8">

          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex justify-center items-center">
              <Logo />
            </div>
            <p className="text-base text-sm sm:text-base mt-1">
              Create Your Account
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-2">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-base mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('name', { required: "Name is required" })}
                  placeholder="Jordi"
                  className="w-full px-3 py-2 pl-9 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base w-4 h-4" />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-semibold text-base mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                {...register('photo', { required: "Profile photo is required" })}
                className="file-input file-input-bordered w-full rounded-xl bg-secondary/10  h-10"
                accept="image/*"
              />
              {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-base mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { required: "Email is required" })}
                  placeholder="Jordan@gmail.com"
                  className="w-full px-3 py-2 pl-9 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base w-4 h-4" />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-base mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pl-9 border  rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base hover:text-secondary"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {err && <p className="text-red-500 text-center text-xs mt-1">{err}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-base py-2 rounded-2xl text-sm font-semibold"
            >
              Create Account
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-base text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-semibold hover:underline">
              Sign In
            </Link>
          </p>

          {/* OR divider */}
          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-base"></div>
            <span className="px-2 text-xs text-base">OR</span>
            <div className="flex-1 h-px bg-base"></div>
          </div>

          <SocialLogin />
        </div>
      </div>

  );
};

export default Register;