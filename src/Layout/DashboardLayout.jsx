import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaCalendarAlt, FaMotorcycle, FaRegCreditCard, FaSignOutAlt, FaTasks, FaUserCog, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const { role } = useRole();

  const { logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <div className="px-4 text-xl font-bold text-primary">StyleDecor Dashboard</div>
                </nav>
                {/* Page content here */}
                <Outlet />
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300 ease-in-out shadow-xl">
                    {/* Sidebar content */}
                    <ul className="menu w-full grow px-2 pt-4">
                        {/* Homepage */}
                        <li className="mb-2">
                            <Link
                                to="/"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                data-tip="Homepage"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-6 flex-shrink-0">
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                                <span className="is-drawer-close:hidden font-medium">Homepage</span>
                            </Link>
                        </li>

                        {/* User Dashboard Links */}
                        <li className="mb-2">
                            <NavLink
                                to="/dashboard/my-bookings"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                data-tip="My Bookings"
                            >
                                <FaCalendarAlt className="size-6 flex-shrink-0" />
                                <span className="is-drawer-close:hidden font-medium">My Bookings</span>
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/dashboard/payment-history"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                data-tip="Payment History"
                            >
                                <FaRegCreditCard className="size-6 flex-shrink-0" />
                                <span className="is-drawer-close:hidden font-medium">Payment History</span>
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/dashboard/profile"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                data-tip="My Profile"
                            >
                                <FaUserCog className="size-6 flex-shrink-0" />
                                <span className="is-drawer-close:hidden font-medium">My Profile</span>
                            </NavLink>
                        </li>

                        {/* Decorator Links */}
                        {role === 'decorator' && (
                            <>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/assigned-projects"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Assigned Projects"
                                    >
                                        <FaTasks className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Assigned Projects</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/today-schedule"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Today's Schedule"
                                    >
                                        <FaCalendarAlt className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Today's Schedule</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/earnings"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Earnings Summary"
                                    >
                                        <FaChartBar className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Earnings Summary</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin Links */}
                        {role === 'admin' && (
                            <>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/manage-services"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Manage Services"
                                    >
                                        <FaBoxOpen className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Manage Services</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/manage-decorators"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Manage Decorators"
                                    >
                                        <FaUsers className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Manage Decorators</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/manage-bookings"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Manage Bookings"
                                    >
                                        <FaCalendarAlt className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Manage Bookings</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/analytics"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                        data-tip="Analytics & Revenue"
                                    >
                                        <FaChartBar className="size-6 flex-shrink-0" />
                                        <span className="is-drawer-close:hidden font-medium">Analytics & Revenue</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Settings */}
                        <li className="mt-auto mb-4">
                            <button
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary w-full text-left"
                                data-tip="Settings"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-6 flex-shrink-0">
                                    <path d="M20 7h-9"></path>
                                    <path d="M14 17H5"></path>
                                    <circle cx="17" cy="17" r="3"></circle>
                                    <circle cx="7" cy="7" r="3"></circle>
                                </svg>
                                <span className="is-drawer-close:hidden font-medium">Settings</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary w-full text-left"
                                data-tip="Logout"
                            >
                                <FaSignOutAlt className="my-1.5 inline-block size-5 text-error" />
                                <span className="is-drawer-close:hidden text-error font-medium">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;