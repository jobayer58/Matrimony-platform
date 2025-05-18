import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyContactRequest = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const { data: contactRequest = [] } = useQuery({
        queryKey: ["contactRequest"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">My Contact Requests</h2>
                    <p>{contactRequest.length}</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-pink-200">
                            <thead>
                                <tr className="bg-pink-100 text-pink-700 text-left">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Biodata ID</th>
                                    <th className="px-4 py-2">Requested On</th>
                                    <th className="px-4 py-2">Contact Info</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-100">
                                {contactRequest.map((req, index) => (
                                    <tr key={req._id} className="hover:bg-pink-50 transition">
                                        <td className="px-4 py-2 font-medium">{index + 1}</td>
                                        <td className="px-4 py-2">#{req.serialNumber}</td>
                                        <td className="px-4 py-2">{req.name}</td>
                                        <td className="px-4 py-2">
                                            {/* <div>
                                                <p className="text-sm text-gray-700 "><strong>Email:</strong> {req.contactEmail}</p>
                                                <p className="text-sm text-gray-700"><strong>Phone:</strong> {req.mobileNumber}</p>
                                            </div> */}
                                            {req.status === "Approved" ? (
                                                <div>
                                                    <p className="text-sm text-gray-700"><strong>Email:</strong> {req.contactEmail}</p>
                                                    <p className="text-sm text-gray-700"><strong>Phone:</strong> {req.mobileNumber}</p>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400 italic">Wait for admin approval.</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${req.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>

                                    </tr>
                                ))}

                                {contactRequest.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            You haven’t requested any contact information yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyContactRequest;