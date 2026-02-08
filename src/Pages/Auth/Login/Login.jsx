import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import toast from 'react-hot-toast'

const Login = () => {
    const { register, handleSubmit, formState: { errors },getValues} = useForm();
    const { signInUser, loading,sendPassResetEmail } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    

    const handleLogin = (data) => {
        console.log('form data', data);
        setErr('');

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                toast.success("Well done !!!");
                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error);
                setErr(error.message);
                

            });


    };


    const handleForgetPassword = () => {
    const values = getValues();
    const email = values.email?.trim();

    if (!email) {
        toast.error("First enter your email");
        return;
    }

    sendPassResetEmail(email)
        .then(() => {
            toast.success("Check your email for reset link");
        })
        .catch(err => {
            if (err.message.includes("user-not-found")) {
                toast.error("There are no Account for this gmail");
            } else {
                toast.error("Something is wrong try again later");
            }
        });
};

    return (
        <div className="min-h-screen  bg-gradient-to-br from-blue-500 to-blue-100 flex items-center justify-center px-4  pb-40">
            {/* Background subtle decoration feel */}
            

            <div className="card bg-base-100 w-full max-w-md shadow-2xl relative z-10 pt-5">
                <div className="card-body p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-primary">StyleDecor</h2>
                        <p className="text-xl mt-2 text-base-content/70">Welcome Back</p>
                        <p className="text-sm mt-1 text-base-content/60">Login to book your dream decoration</p>

                        {/* Subtle floral divider */}
                        <div className="flex items-center justify-center mt-3">
                            <div className="border-t border-primary/20 w-20"></div>
                            <div className="mx-4 text-primary/40">✦</div>
                            <div className="border-t border-primary/20 w-20"></div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
                            <button
                                type="button"
                                onClick={handleForgetPassword}
                                disabled={loading}
                                className={`link link-hover text-secondary hover:text-secondary/80 text-sm '}`}
                            >
                                 'Forget password?'
                            </button>

                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-4 text-white">
                            Login
                        </button>
                    </form>
                    {
                        err && <p className='text-red-500'> {err}</p>
                    }

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