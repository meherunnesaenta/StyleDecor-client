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



    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-200">
      <div
        className="
w-full max-w-md sm:max-w-lg bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 sm:p-8
    "
      >

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-2">
            <Logo />
          </div>
          <p className="text-base text-base">Welcome Back</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-base">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                {...register('email', { required: "Email is required" })}
                placeholder="Jordan@gmail.com"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-base ">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register('password', {
                  required: true,
                  minLength: { value: 6, message: "At least 6 characters" }
                })}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-base hover:text-secondary"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgetPassword}
              disabled={loading}
              className="text-sm text-secondary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-base py-2.5 rounded-2xl"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </form>

        {err && <p className="text-red-500 text-center mt-4">{err}</p>}

        {/* Register link */}
        <p className="text-center text-base mt-2 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-secondary font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        {/* OR divider */}
        <div className="flex items-center my-3">
          <div className="flex-1 h-px bg-base"></div>
          <span className="px-4 text-sm text-base">OR</span>
          <div className="flex-1 h-px bg-base"></div>
        </div>

        <SocialLogin />

      </div>
    </div>

  );
};

export default Login;