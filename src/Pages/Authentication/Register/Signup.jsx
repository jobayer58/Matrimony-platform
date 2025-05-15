import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import UseAuth from '../../../Hooks/UseAuth';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import PinkLoader from '../../Shared/PinkLoader';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const Signup = () => {
    const axiosSecure = UseAxiosSecure()
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, setUser, signinWithGoogle, loading } = UseAuth()
    const navigate = useNavigate()
    if (loading) {
        return <PinkLoader></PinkLoader>
    }

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                setUser(user)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,

                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: "success",
                                        title: 'user create successfully',
                                        showConfirmButton: false,
                                        timer: 10000
                                    })
                                }
                            })
                        reset()
                        console.log("Photo URL:", data.photoURL);
                        navigate('/')
                    })
                    .catch(error => {
                        toast.warn(error.message)
                    })
            })
    }

    const handleGoogleSignin = () => {
        signinWithGoogle()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);

                    })
                Swal.fire({
                    title: "You are Login Successfully",
                    animation: {
                        popup: 'animate__animated animate__fadeInUp',
                        hide: 'animate__animated animate__fadeOutDown'
                    }
                });
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                error.message
                Swal.fire({
                    title: "Login failed",
                    text: error.message ,
                    icon: "error"
                });
            })
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-4 py-10">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Create a New Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                {...register("name", { required: true, minLength: 5 })}
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Your full name"
                            />
                            {errors.name && <span className='text-red-500'>Must be more the 5 character long</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PhotoURL</label>
                            <input
                                {...register("photoURL", { required: true })}
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Your PhotoURL Link"
                            />
                            {errors.name && <span className='text-red-500'>photoURL is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="write Your Email"
                            />
                            {errors.name && <span className='text-red-500'>email is required</span>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder='••••••••'
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            {errors.password?.type === 'required' && <p className='text-red-600'>password must be less then 20 character </p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-600'>password must be 6 character </p>}
                            {errors.password?.type === 'mexLength' && <p className='text-red-600'>password must be less then 20 character </p>}
                            {errors.password?.type === 'pattern' && <p className='text-red-600'>password must be one uppercase one lowercase on special number on spacial  character </p>}
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
                            Register
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-3 text-gray-500 font-medium">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Google Button */}
                    <button onClick={handleGoogleSignin}
                        className="w-full border border-gray-300 flex items-center justify-center gap-3 py-3 rounded-lg shadow-sm hover:shadow-md transition font-medium text-gray-700"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Sign up with Google
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Already have an account? <Link to='/login' className="text-pink-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;