import React, { useState, useEffect } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaBoxOpen, FaCalendarAlt, FaChartBar, FaMotorcycle, FaRegCreditCard, FaSignOutAlt, FaTasks, FaUserCog, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';
// import useAxiosSecure from '../hooks/useAxiosSecure'; // Removed as unused
import BecomeDecoratorModal from '../components/Seller/BecomeDecoratorModal';

const DashboardLayout = () => {
    const { role } = useRole();
    // const axiosSecure = useAxiosSecure(); // Removed as unused

    const { logOut } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // সাইডবার ওপেন হলে কনটেন্টকে push করার জন্য
    useEffect(() => {
        const checkbox = document.getElementById('my-drawer-4');
        const drawerContent = document.querySelector('.drawer-content');

        const handleChange = () => {
            if (checkbox.checked) {
                drawerContent.classList.add('ml-64');  // সাইডবার width অনুসারে margin-left (w-64 = 16rem = 256px)
            } else {
                drawerContent.classList.remove('ml-64');
            }
        };

        checkbox.addEventListener('change', handleChange);
        handleChange();  // initial check

        return () => checkbox.removeEventListener('change', handleChange);
    }, []);

    const handleLogout = () => {
        logOut();
    };

    return (

        <div>
        <div className="drawer">  {/* lg:drawer-open রিমুভ করা হয়েছে যাতে সব স্ক্রিনে টগল হয় */}
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content transition-all duration-300">  {/* transition যোগ করা */}
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost cursor-pointer">
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

            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay !backdrop-blur-none"></label>  {/* Blur রিমুভ করা */}
                <div className="flex min-h-full flex-col items-start bg-base-200 w-64 transition-all duration-300 ease-in-out shadow-xl">
                    {/* Sidebar content */}
                    <ul className="menu w-full grow px-2 pt-4">
                        {/* Homepage */}
                        <li className="mb-2">
                            <Link
                                to="/"
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-6 flex-shrink-0">
                                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                                <span className="font-medium">Homepage</span>
                            </Link>
                        </li>

                        {/* User Dashboard Links */}
                        <li className="mb-2">
                            <NavLink
                                to="/dashboard/my-bookings"
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                            >
                                <FaCalendarAlt className="size-6 flex-shrink-0" />
                                <span className="font-medium">My Bookings</span>
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/dashboard/payment-history"
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                            >
                                <FaRegCreditCard className="size-6 flex-shrink-0" />
                                <span className="font-medium">Payment History</span>
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/dashboard/profile"
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                            >
                                <FaUserCog className="size-6 flex-shrink-0" />
                                <span className="font-medium">My Profile</span>
                            </NavLink>
                        </li>

                        {/* Decorator Links */}
                        {role === 'decorator' && (
                            <>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/assigned-projects"
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaTasks className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Assigned Projects</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/today-schedule"
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaCalendarAlt className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Today's Schedule</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/earnings"
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaChartBar className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Earnings Summary</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin Links */}
                        {role === 'admin' && (
                            <>
                                <li className="mb-2">
                                    <NavLink
                                         to="/dashboard/admin/servicesadd" // Changed to dashboard route
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaBoxOpen className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Manage Services</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/manage-decorators"
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaUsers className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Manage Decorators</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/admin/booking"
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaCalendarAlt className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Manage Bookings</span>
                                    </NavLink>
                                </li>
                                <li className="mb-2">
                                    <NavLink
                                        to="/dashboard/admin/analytics"
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary data-[active]:bg-primary data-[active]:text-white"
                                    >
                                        <FaChartBar className="size-6 flex-shrink-0" />
                                        <span className="font-medium">Analytics & Revenue</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Settings */}
                        <li className="mt-auto mb-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                disabled={role === 'decorator'}
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all hover:bg-secondary/10 w-full text-left disabled:opacity-50"
                            >
                                <FaMotorcycle className="size-6 flex-shrink-0" />  {/* Added icon */}
                                <span className="font-medium">
                                    {role === 'decorator' ? 'You are a Decorator ✓' : 'Be a Decorator'}
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/10 hover:text-secondary w-full text-left"
                            >
                                <FaSignOutAlt className="my-1.5 inline-block size-5 text-error" />
                                <span className="text-error font-medium">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <BecomeDecoratorModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
        </div>
        </div>
    );
};

export default DashboardLayout;