import React from 'react';

const EditBioData = () => {
    return (
        <div>
            
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Create BioData</h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side */}
                        <div className="space-y-5">
                            {/* BioData Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">BioData Type</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                                    <option value="">Select Type</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    placeholder="Full name"
                                />
                            </div>

                            {/* Profile Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image Link</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    placeholder="Image URL"
                                />
                            </div>

                            {/* Date of birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            {/* Height */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                                    {/* <option value="">Select Weight</option>
                                    <option value="50kg">50kg</option>
                                    <option value="55kg">55kg</option>
                                    <option value="60kg">60kg</option> */}
                                    <option value="">Select Weight</option>
                                    <option>50kg - 55kg</option>
                                    <option>55kg - 60kg</option>
                                    <option>60kg - 65kg</option>
                                    <option>65kg - 70kg</option>
                                </select>
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                    placeholder="Age"
                                />
                            </div>

                            {/* Occupation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                                    <option value="">Select Occupation</option>
                                    <option value="student">Student</option>
                                    <option value="job">Job Holder</option>
                                    <option value="business">Business</option>
                                    <option value="unemployed">Unemployed</option>
                                    <option value="freelancer">Freelancer</option>
                                    <option value="webDeveloper">Web Developer</option>
                                    <option value="softwareEngineer">Software engineer</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                            {/* Contact Email (Readonly) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                <input
                                    type="email"
                                    value="user@example.com"
                                    readOnly
                                    className="w-full bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                                />
                            </div>

                        </div>

                        {/* Right Side */}
                        <div className="space-y-5">
                            {/* Race */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Race (Skin Color)</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                                    <option value="">Select Race</option>
                                    <option value="fair">Fair</option>
                                    <option value="medium">Medium</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>

                            {/* Father's name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            {/* Mother's name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            {/* Permanent Division */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Division</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
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

                            {/* Present Division */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Present Division</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
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

                            {/* Expected Partner Age */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Partner Age</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>

                            {/* Expected Partner Height */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Partner Height</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
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

                            {/* Expected Partner Weight */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Partner Weight</label>
                                <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
                                    <option value="">Select Weight</option>
                                    <option>50kg - 55kg</option>
                                    <option>55kg - 60kg</option>
                                    <option>60kg - 65kg</option>
                                    <option>65kg - 70kg</option>
                                </select>
                            </div>



                            {/* Mobile Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="01xxxxxxxxx"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Submit button */}
                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                        >
                            Save And Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBioData;