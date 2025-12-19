import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router'; 
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                // Image upload to ImgBB
                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUserProfile(userProfile)
                            .then(() => {
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 pointer-events-none"></div>

            <div className="card bg-base-100 w-full max-w-md shadow-2xl relative z-10">
                <div className="card-body p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-primary">StyleDecor</h2>
                        <p className="text-xl mt-2 text-base-content/70">Create Your Account</p>
                        <p className="text-sm mt-1 text-base-content/60">Join us to book beautiful decorations</p>

                        {/* Luxury divider */}
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
                                {...register('name', { required: true })}
                                placeholder="Your full name"
                                className="input input-bordered w-full"
                            />
                            {errors.name && <p className="text-error text-sm mt-1">Name is required</p>}
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Profile Photo</span>
                            </label>
                            <input
                                type="file"
                                {...register('photo', { required: true })}
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                            />
                            {errors.photo && <p className="text-error text-sm mt-1">Profile photo is required</p>}
                        </div>

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
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                })}
                                placeholder="••••••••"
                                className="input input-bordered w-full"
                            />
                            {errors.password?.type === 'required' && <p className="text-error text-sm mt-1">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-error text-sm mt-1">Password must be at least 6 characters</p>}
                            {errors.password?.type === 'pattern' && (
                                <p className="text-error text-sm mt-1">
                                    Password must contain uppercase, lowercase, number & special character
                                </p>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-6 text-white">
                            Create Account
                        </button>
                    </form>

                    {/* Login link */}
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

                    {/* Social Login */}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;