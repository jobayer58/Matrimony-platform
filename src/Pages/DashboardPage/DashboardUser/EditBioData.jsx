import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditBioData = () => {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();

    const [isEditing, setIsEditing] = useState(false);
    const [existingImage, setExistingImage] = useState('');
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, setValue } = useForm();

    // Load user's existing BioData
    useEffect(() => {
        const fetchBioData = async () => {
            try {
                const res = await axiosSecure.get(`/myBioData?email=${user?.email}`);
                if (res.data) {
                    setIsEditing(true);
                    setExistingImage(res.data.profileImage);

                    // from Field
                    const fields = [
                        'biodataType', 'name', 'dateOfBirth', 'height',
                        'weight', 'age', 'occupation', 'race', 'fathersName',
                        'mothersName', 'permanentDivision', 'presentDivision',
                        'expectedPartnerAge', 'expectedPartnerHeight',
                        'expectedPartnerWeight', 'mobileNumber'
                    ];

                    fields.forEach(field => {
                        setValue(field, res.data[field]);
                    });
                }
            } catch (error) {
                console.error('Error loading BioData:', error);
            }
        };

        if (user?.email) {
            fetchBioData();
        }
    }, [user?.email, axiosSecure, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let imageUrl = existingImage;

            // uploaded new image
            if (data.profileImage && data.profileImage.length > 0) {
                const imageFile = new FormData();
                imageFile.append('image', data.profileImage[0]);

                const uploadRes = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                imageUrl = uploadRes.data.data.display_url;
            }

            const bioData = {
                ...data,
                contactEmail: user?.email,
                profileImage: imageUrl
            };

            // send data to server
            const res = await axiosSecure.post('/matchesBio', bioData);

            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.action === 'created'
                        ? 'Your BioData Is Successfully Created!'
                        : 'updated your BioData Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/viewBioData');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'something Error',
                text: error.response?.data?.message || 'Try It'
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-pink-500 to-indigo-500 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white">
                        {isEditing ? 'Update Your BioData' : 'Create Your BioData'}
                    </h2>
                    <p className="text-pink-100 mt-1">
                        {isEditing ? 'Edit your information below' : 'Fill in your details to create a BioData'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center space-y-4">
                        {existingImage && (
                            <div className="relative group">
                                <img
                                    src={existingImage}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-medium">Change Photo</span>
                                </div>
                            </div>
                        )}
                        <div className="w-full max-w-xs">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {existingImage ? 'Change Profile Photo' : 'Upload Profile Photo'}
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        {...register('profileImage')}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gender *
                                </label>
                                <select
                                    {...register("biodataType", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date of Birth *
                                </label>
                                <input
                                    type="date"
                                    {...register("dateOfBirth", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    {...register("age", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                />
                            </div>

                            {/*  permanent Division */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    permanent Division *
                                </label>
                                <select
                                    {...register("permanentDivision", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Division</option>
                                    <option>Dhaka</option>
                                    <option>chattogram</option>
                                    <option>Rangpur</option>
                                    <option>Barisal</option>
                                    <option>Khulna</option>
                                    <option>Mymensingh</option>
                                    <option>Sylhet</option>
                                </select>
                            </div>

                            {/*  present Division */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    present Division *
                                </label>
                                <select
                                    {...register("presentDivision", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Division</option>
                                    <option>Dhaka</option>
                                    <option>Chattagram</option>
                                    <option>Rangpur</option>
                                    <option>Barisal</option>
                                    <option>Khulna</option>
                                    <option>Mymensingh</option>
                                    <option>Sylhet</option>
                                </select>
                            </div>

                            {/* expected partner Age */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    expected partner Age *
                                </label>
                                <input
                                    type="number"
                                    {...register("expectedPartnerAge", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                />
                            </div>

                            {/* expected partner Height */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    expected partner Height *
                                </label>
                                <select
                                    {...register("expectedPartnerHeight", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Height</option>
                                    <option value="4'8&quot;">4'8"</option>
                                    <option value="4'9&quot;">4'9"</option>
                                    <option value="4'10&quot;">4'10"</option>
                                    <option value="4'11&quot;">4'11"</option>
                                    <option value="5'0&quot;">5'0"</option>
                                    <option value="5'1&quot;">5'1"</option>
                                    <option value="5'2&quot;">5'2"</option>
                                    <option value="5'3&quot;">5'3"</option>
                                    <option value="5'4&quot;">5'4"</option>
                                    <option value="5'5&quot;">5'5"</option>
                                    <option value="5'6&quot;">5'6"</option>
                                    <option value="5'7&quot;">5'7"</option>
                                    <option value="5'8&quot;">5'8"</option>
                                    <option value="5'9&quot;">5'9"</option>
                                    <option value="5'10&quot;">5'10"</option>
                                </select>
                            </div>

                            {/* expected partner  Weight */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    expected partner Weight *
                                </label>
                                <select
                                    {...register("expectedPartnerWeight", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Weight</option>
                                    <option>50kg - 55kg</option>
                                    <option>55kg - 60kg</option>
                                    <option>60kg - 65kg</option>
                                    <option>65kg - 70kg</option>
                                    <option>70kg - 75kg</option>
                                    <option>75kg - 80kg</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {/* Physical Attributes Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Physical Attributes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Height */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Height *
                                </label>
                                <select
                                    {...register("height", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Height</option>
                                    <option value="4'8&quot;">4'8"</option>
                                    <option value="4'9&quot;">4'9"</option>
                                    <option value="4'10&quot;">4'10"</option>
                                    <option value="4'11&quot;">4'11"</option>
                                    <option value="5'0&quot;">5'0"</option>
                                    <option value="5'1&quot;">5'1"</option>
                                    <option value="5'2&quot;">5'2"</option>
                                    <option value="5'3&quot;">5'3"</option>
                                    <option value="5'4&quot;">5'4"</option>
                                    <option value="5'5&quot;">5'5"</option>
                                    <option value="5'6&quot;">5'6"</option>
                                    <option value="5'7&quot;">5'7"</option>
                                    <option value="5'8&quot;">5'8"</option>
                                    <option value="5'9&quot;">5'9"</option>
                                    <option value="5'10&quot;">5'10"</option>
                                </select>
                            </div>

                            {/* Weight */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Weight *
                                </label>
                                <select
                                    {...register("weight", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Weight</option>
                                    <option>50kg - 55kg</option>
                                    <option>55kg - 60kg</option>
                                    <option>60kg - 65kg</option>
                                    <option>65kg - 70kg</option>
                                    <option>70kg - 75kg</option>
                                    <option>75kg - 80kg</option>
                                </select>
                            </div>

                            {/* Complexion */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Complexion *
                                </label>
                                <select
                                    {...register("race", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Complexion</option>
                                    <option value="fair">Fair</option>
                                    <option value="medium">Medium</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>

                            {/* Occupation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Occupation *
                                </label>
                                <select
                                    {...register("occupation", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                >
                                    <option value="">Select Occupation</option>
                                    <option value="student">Student</option>
                                    <option value="job">Job Holder</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Family Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Family Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Father's Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Father's Name *
                                </label>
                                <input
                                    type="text"
                                    {...register("fathersName", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                />
                            </div>

                            {/* Mother's Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mother's Name *
                                </label>
                                <input
                                    type="text"
                                    {...register("mothersName", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email (readonly) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    {...register("contactEmail", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    {...register("mobileNumber", { required: true })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                                    placeholder="01XXXXXXXXX"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform"
                        >
                            {isEditing ? 'Update BioData' : 'Create BioData'}
                            <ArrowRight className="h-5 w-5 inline ml-2"></ArrowRight>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBioData;