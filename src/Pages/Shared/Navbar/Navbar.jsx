import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth'; 

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    };

    const navLinks = (
        <>
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50 px-4 lg:px-10">
            <div className="navbar-start">
                {/* Mobile menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>

                {/* Logo & Brand */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-primary">StyleDecor</div>
                    <span className="text-secondary text-sm hidden sm:block">✦ Elegant Living</span>
                </Link>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg font-medium">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {/* Dashboard button (only if logged in) */}
                {user && (
                    <Link to="/dashboard" className="btn btn-primary text-white hidden sm:inline-flex">
                        Dashboard
                    </Link>
                )}

                {/* User profile / Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar online cursor-pointer">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL || 'https://i.ibb.co.com/0s7Y5Zn/user-placeholder.jpg'} alt="Profile" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3 z-[1]">
                            <li className="px-4 py-2 text-center font-medium">{user.displayName || 'User'}</li>
                            <li><Link to="/dashboard">My Dashboard</Link></li>
                            <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-outline btn-primary">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;