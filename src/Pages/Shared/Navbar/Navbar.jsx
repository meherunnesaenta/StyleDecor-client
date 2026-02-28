import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { Logo } from '../../../components/Logo/Logo';
import ThemeToggle from '../../../../ThemeToggle/ThemeToggle';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  const activeClass =
    'bg-primary/10 text-primary font-semibold rounded-lg';
  const inactiveClass =
    'text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-all';

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2.5 ${isActive ? activeClass : inactiveClass}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `px-4 py-2.5 ${isActive ? activeClass : inactiveClass}`
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2.5 ${isActive ? activeClass : inactiveClass}`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2.5 ${isActive ? activeClass : inactiveClass}`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar w-full bg-white/80 px-4 sm:px-6 lg:px-8 backdrop-blur-lg shadow-sm fixed top-0 z-50 border-b border-base-200 flex justify-between items-center">
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-xl w-56 border border-gray-100/80"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <Logo />
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3 sm:gap-4">
        <ThemeToggle />
        {/* Dashboard Button */}
        {user && (
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `btn btn-sm sm:btn-md ${
                isActive
                  ? 'btn-primary text-base'
                  : 'btn-outline btn-primary'
              } hidden sm:flex items-center gap-2`
            }
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </NavLink>
        )}

        {/* User / Login */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-9 sm:w-10 rounded-full ring ring-primary/40 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    'https://i.ibb.co/0s7Y5Zn/user-placeholder.jpg'
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow-2xl bg-primary/90 rounded-xl w-60 mt-3 border"
            >
              <li className="px-4 py-2 text-center font-medium text-white border-b">
                {user.displayName || 'User'}
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="text-sm text-white py-2.5 hover:bg-base"
                >
                  My Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:bg-base py-2.5"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn btn-outline btn-primary btn-sm sm:btn-md px-5 sm:px-7"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;