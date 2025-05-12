import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import UseAuth from '../../../Hooks/UseAuth';
// import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import { toast, ToastContainer, Zoom } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = UseAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'


    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        signIn(email, password)
            .then(result => {
                const user = result.user
                console.log(user);
                Swal.fire({
                    title: "you are login successfully",
                    showClass: {
                        popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                    },
                    hideClass: {
                        popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                    }
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                if (error) {
                    toast.warn(error.code, {
                        position: "top-center",
                        closeOnClick: true,
                        transition: Zoom,
                    });
                }
            })
    }
    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-4 py-10">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login to Your Account</h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                name='email'
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="write Your Email"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                name='password'
                                type={showPassword ? "text" : "password"}
                                placeholder='••••••••'
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 pt-6 flex items-center text-gray-500"
                            >
                                {showPassword ? <AiOutlineEye size={20}></AiOutlineEye> : <AiOutlineEyeInvisible size={20}></AiOutlineEyeInvisible>}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-3 text-gray-500 font-medium">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Google Button */}
                    <button
                        className="w-full border border-gray-300 flex items-center justify-center gap-3 py-3 rounded-lg shadow-sm hover:shadow-md transition font-medium text-gray-700"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Sign in with Google
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Don’t have an account? <a href="/register" className="text-pink-600 font-semibold hover:underline">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;