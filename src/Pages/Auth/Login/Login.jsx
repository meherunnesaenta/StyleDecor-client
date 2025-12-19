import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router'; 
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            {/* Background subtle decoration feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 pointer-events-none"></div>

            <div className="card bg-base-100 w-full max-w-md shadow-2xl relative z-10">
                <div className="card-body p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-primary">StyleDecor</h2>
                        <p className="text-xl mt-2 text-base-content/70">Welcome Back</p>
                        <p className="text-sm mt-1 text-base-content/60">Login to book your dream decoration</p>

                        {/* Subtle floral divider */}
                        <div className="flex items-center justify-center mt-6">
                            <div className="border-t border-primary/20 w-20"></div>
                            <div className="mx-4 text-primary/40">✦</div>
                            <div className="border-t border-primary/20 w-20"></div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="your@email.com"
                                className="input input-bordered w-full"
                            />
                            {errors.email && <p className="text-error text-sm mt-1">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                placeholder="••••••••"
                                className="input input-bordered w-full"
                            />
                            {errors.password?.type === 'minLength' && (
                                <p className="text-error text-sm mt-1">Password must be 6 characters or longer</p>
                            )}
                            {errors.password?.type === 'required' && (
                                <p className="text-error text-sm mt-1">Password is required</p>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <a href="#" className="link link-hover text-secondary hover:text-secondary/80 text-sm">
                                Forgot password?
                            </a>
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-4 text-white">
                            Login
                        </button>
                    </form>

                    {/* Register link */}
                    <p className="text-center mt-6 text-base-content/70">
                        New to StyleDecor?{' '}
                        <Link
                            to="/register"
                            state={location.state}
                            className="link link-hover text-secondary font-medium hover:text-secondary/80"
                        >
                            Create an Account
                        </Link>
                    </p>

                    {/* Social Login */}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;