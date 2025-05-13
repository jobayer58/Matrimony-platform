import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';
import { Tooltip } from 'react-tooltip';
// text-[#c48c46] text-[#66451c]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = UseAuth()
    const path = <>
        <NavLink to='/' className={({ isActive }) =>
            isActive ? " text-pink-700 font-semibold" : "text-pink-400"
        }>Home</NavLink>

        <NavLink to='/matches' className={({ isActive }) =>
            isActive ? "text-pink-700 font-semibold" : "text-pink-400"
        }>BioData</NavLink>

        <NavLink to='/about' className={({ isActive }) =>
            isActive ? "text-pink-700 font-semibold" : "text-pink-400"
        }>About</NavLink>

        <NavLink to='/contact' className={({ isActive }) =>
            isActive ? "text-pink-700 font-semibold" : "text-pink-400"
        }>Contact</NavLink>
        {
            user?.email && 
            <NavLink to='/dashboard' className={({ isActive }) =>
                isActive ? "text-pink-700 font-semibold" : "text-pink-400"
            }>Dashboard</NavLink>

        }
    </>
    return (
        <div>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex justify-center items-center  text-indigo-600 gap-1">
                            <img src="/src/assets/logo.jpg" className='lg:h-14 lg:w-14 h-10 w-10 object-cover' alt="" />
                            <p className='text-pink-400 lg:text-3xl font-bold md:text-[18px] text-2xl' >Matrimony</p>
                        </div>
                        {/* Desktop Menu */}
                        <ul className="hidden md:flex space-x-6 lg:text-xl">
                            {path}
                        </ul>

                        {/* Desktop Login/Register */}
                        <div className="hidden md:flex space-x-4">
                            {
                                user?.email && <div><img data-tooltip-id="logo-img-tooltip" className="lg:w-14 lg:h-14 w-12 h-12 rounded-full object-cover" src={user?.photoURL} alt="" />
                                    <Tooltip id="logo-img-tooltip" place="left" effect="solid">
                                        {
                                            user?.displayName
                                        }
                                    </Tooltip>
                                </div>

                            }
                            {
                                user && user?.email ?
                                    <button onClick={logOut} className="lg:px-4 lg:py-2 md:px-2 md:py-1 border border-pink-400 text-pink-400 rounded hover:bg-pink-700  lg:text-xl">LOGOUT</button>
                                    :
                                    <Link to='/login' className="px-4 py-2  border border-pink-400 text-pink-400 rounded hover:bg-pink-700  lg:text-xl">
                                        LOGIN
                                    </Link>
                            }
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    {isOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <ul className="md:hidden grid px-4 pt-2 pb-4 space-y-2">
                        {path}
                        <div className="pt-2 space-y-2">
                            {
                                user && user?.email ?
                                    <button onClick={logOut} className="w-full px-4 py-2 border border-pink-400 text-pink-400 rounded hover:bg-pink-700 text-xl">LOGOUT</button>
                                    :
                                    <Link to='login' className="block text-center w-full px-4 py-2 border border-pink-400 text-pink-400 rounded hover:bg-pink-700 text-xl">LOGIN</Link>
                            }
                        </div>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;