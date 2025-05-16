import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import { LayoutDashboard, Users, Crown, Phone, Pencil, Eye, Heart, LogOut, Home, CheckCheck, Menu } from 'lucide-react';
import Swal from 'sweetalert2';
import UseAdmin from '../Hooks/UseAdmin';

const Dashboard = () => {
    const location = useLocation();
    const {  logOut } = UseAuth();
    // const isAdmin = user?.role === 'admin';
    const [isAdmin] = UseAdmin()
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const locationSet = location.pathname;
        const locationTitle = locationSet === '/' ? 'Home' : locationSet.split('/')[1];
        document.title = `Matrimony | ${locationTitle.charAt(0).toUpperCase() + locationTitle.slice(1)}`;
    }, [location]);

    const navLinkStyle = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-100 transition duration-200 ${isActive ? 'bg-indigo-200 text-indigo-800 font-semibold' : 'text-gray-700'}`;

    const handleLogOut = () => {
        logOut();
        Swal.fire({
            title: 'You are Logged Out Successfully',
            animation: {
                popup: 'animate__animated animate__fadeInUp',
                hide: 'animate__animated animate__fadeOutDown'
            }
        });
        navigate('/');
    };

    const closeSidebar = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const SidebarLinks = () => (
        <>
            <NavLink to="/" className={navLinkStyle}>
                <Home className="w-5 h-5" /> Home
            </NavLink>

            {isAdmin ? (
                <>
                    <NavLink to="/dashboard/admin" className={navLinkStyle} onClick={closeSidebar}>
                        <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/manage" className={navLinkStyle} onClick={closeSidebar}>
                        <Users className="w-5 h-5" /> Manage Users
                    </NavLink>
                    <NavLink to="/dashboard/premium" className={navLinkStyle} onClick={closeSidebar}> 
                        <Crown className="w-5 h-5" /> Approved Premium
                    </NavLink>
                    <NavLink to="/dashboard/contactRequest" className={navLinkStyle} onClick={closeSidebar}>
                        <Phone className="w-5 h-5" /> Approved Contact Requests
                    </NavLink>
                    <NavLink to="/dashboard/successStory" className={navLinkStyle} onClick={closeSidebar}>
                        <CheckCheck className="w-5 h-5" /> Success Story
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/dashboard/editBioData" className={navLinkStyle} onClick={closeSidebar}>
                        <Pencil className="w-5 h-5 " /> Edit BioData
                    </NavLink>
                    <NavLink to="/dashboard/viewBioData" className={navLinkStyle} onClick={closeSidebar}>
                        <Eye className="w-5 h-5" /> View BioData
                    </NavLink>
                    <NavLink to="/dashboard/contactRequest" className={navLinkStyle} onClick={closeSidebar}>
                        <Phone className="w-5 h-5" /> My Contact Request
                    </NavLink>
                    <NavLink to="/dashboard/favorites" className={navLinkStyle} onClick={closeSidebar}>
                        <Heart className="w-5 h-5" /> Favorites BioData
                    </NavLink>
                    <NavLink to="/dashboard/gotMarried" className={navLinkStyle} onClick={closeSidebar}>
                        <CheckCheck className="w-5 h-5" /> Got Married
                    </NavLink>
                </>
            )}

            <button
                onClick={handleLogOut}
                className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
            >
                <LogOut className="w-5 h-5" /> Logout
            </button>
        </>
    );

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar for large screen */}
            <aside className="hidden md:block lg:w-96 bg-gradient-to-b from-pink-200 via-purple-200 to-indigo-200 p-6 fixed h-screen top-0 left-0 shadow-md z-10">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                </h2>
                <nav className="flex flex-col gap-3 text-base">
                    <SidebarLinks />
                </nav>
            </aside>

            {/* Sidebar toggle for mobile */}
            <div className="md:hidden fixed top-4 left-4 z-20">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-indigo-500 text-white rounded shadow"
                >
                    <Menu />
                </button>
            </div>

            {/* Sidebar drawer for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}>
                    <aside className="absolute top-0 left-0 w-64 h-full bg-gradient-to-b from-pink-200 via-purple-200 to-indigo-200 p-6 shadow-md" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                            {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                        </h2>
                        <nav className="flex flex-col gap-3 text-base">
                            <SidebarLinks />
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:ml-96 md:ml-62 overflow-y-auto w-full">
                <Outlet />
                {
                    isAdmin ?
                        <Navigate to='/dashboard/admin' replace={true}></Navigate>
                        : <Navigate to='/dashboard/viewBioData' replace={true}></Navigate>
                }
            </main>
        </div>
    );
};

export default Dashboard;
