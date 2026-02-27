import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import toast from 'react-hot-toast';

import universalIllustration from '../../../assets/login-illustration.png'; 
import { Logo } from '../../../components/Logo/Logo';
import Button from '../../../components/Shared/Button/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const { signInUser, loading, sendPassResetEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    setErr('');
    signInUser(data.email, data.password)
      .then(() => {
        toast.success("Welcome back ");
        navigate(location?.state || '/');
      })
      .catch(() => setErr("Invalid email or password"));
  };

  const handleForgetPassword = () => {
    const email = getValues().email?.trim();
    if (!email) {
      toast.error("Enter your email first");
      return;
    }
    sendPassResetEmail(email)
      .then(() => toast.success("Reset link sent to your email"))
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-cyan-50 via-blue-100 to-indigo-100 relative overflow-hidden">

      <div className="absolute -top-24 -left-24 w-96 h-96  rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-16 w-[600px] h-[600px] bg-blue-400/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl opacity-70"></div>

      {/* Illustration - */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-10 z-10">
        <img
          src={universalIllustration}
          alt="StyleDeocor Illustration"
          className="w-full max-w-3xl h-auto object-contain drop-shadow-2xl animate-float-slow"
        />
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 lg:py-0 lg:px-8 z-20">
        <div className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-secondary rounded-3xl p-8 md:p-10 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-3">
              <Logo></Logo>
              
            </div>
            <p className="text-gray-600 text-lg">Welcome Back</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

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

              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password', { required: true, minLength: { value: 6, message: "At least 6 characters" } })}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-secondary"
                >
                 {showPassword ? (
                                     <FiEyeOff className="w-5 h-5" />
                                   ) : (
                                     <FiEye className="w-5 h-5" />
                                   )}
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1.5">{errors.password.message}</p>}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgetPassword}
                disabled={loading}
                className="text-sm text-secondary hover:text-secondary hover:underline"
              >
                Forgot password?
              </button>
            </div>


            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading} className='w-full bg-primary text-white py-3 rounded-2xl'
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {err && <p className="text-red-500 text-center mt-5">{err}</p>}

          {/* Register link */}
          <p className="text-center text-gray-600 mt-8">
            Don’t have an account?{" "}
            <Link to="/register" className="text-secondary font-semibold hover:underline">
              Sign Up
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

export default Login;