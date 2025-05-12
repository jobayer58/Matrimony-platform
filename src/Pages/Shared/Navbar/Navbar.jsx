import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const path = <>
        <NavLink to='/' className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-black"
        }>Home</NavLink>

        <NavLink to='/matches' className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-black"
        }>Matches</NavLink>

        <NavLink to='/about' className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-black"
        }>About</NavLink>

        <NavLink to='/contact' className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold" : "text-black"
        }>Contact</NavLink>
    </>
    return (
        <div>
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex justify-center items-center text-2xl font-bold text-indigo-600 gap-1">
                            <img src="/src/assets/love.png" className='h-10 w-10 object-cover' alt="" />
                            <p>Matrimony</p>
                        </div>
                        {/* Desktop Menu */}
                        <ul className="hidden md:flex space-x-6">
                            {path}
                        </ul>

                        {/* Desktop Login/Register */}
                        <div className="hidden md:flex space-x-4">
                            <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">
                                Login
                            </button>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                                Register
                            </button>
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
                            <button className="w-full px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50">
                                Login
                            </button>
                            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                Register
                            </button>
                        </div>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;