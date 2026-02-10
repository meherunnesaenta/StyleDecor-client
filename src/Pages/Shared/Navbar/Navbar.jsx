import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    };


    const activeClass = "bg-primary text-white hover:text-white";
    const inactiveClass = "hover:text-primary hover:bg-primary/10";

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all font-medium ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/services"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all font-medium ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    Services
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all font-medium ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    About
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all font-medium ${isActive ? activeClass : inactiveClass}`
                    }
                >
                    Contact
                </NavLink>
            </li>
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
                <NavLink to="/" className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-primary">StyleDecor</div>
                    <span className="text-secondary text-sm hidden sm:block">✦ Elegant Living</span>
                </NavLink>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {/* Dashboard button */}
                {user && (
                    <NavLink 
                        to="/dashboard/profile" 
                        className={({ isActive }) => 
                            `btn ${isActive ? 'btn-primary text-primary' : 'btn-outline btn-primary '}   hidden sm:inline-flex`
                        }
                    >
                        Dashboard
                    </NavLink>
                )}

                {/* User profile / Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="avatar online cursor-pointer">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img 
                                    src={user.photoURL || 'https://i.ibb.co/0s7Y5Zn/user-placeholder.jpg'} 
                                    alt="Profile" 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3 z-[1]">
                            <li className="px-4 py-2 text-center font-medium">{user.displayName || 'User'}</li>
                            <li><NavLink to="/dashboard">My Dashboard</NavLink></li>
                            <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <NavLink to="/login" className="btn btn-outline btn-primary">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;




