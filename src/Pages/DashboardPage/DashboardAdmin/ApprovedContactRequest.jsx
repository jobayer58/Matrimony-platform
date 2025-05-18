import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PinkLoader from '../../Shared/PinkLoader';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';

const ApprovedContactRequest = () => {
    const axiosSecure = UseAxiosSecure()
    const { loading } = UseAuth()

    const { data: requests = [], refetch } = useQuery({
        queryKey: ["approved-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact-request`);
            return res.data;
        },
    });
    const handleRequestApproved = (id) => {
        axiosSecure
            .patch(`/approved-contact-request?id=${id}`)
            .then((res) => {
                if (res.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: "Approved",
                        text: "Contact request approved.",
                        icon: "success",
                        timer: 3000,
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    timer: 3000,
                });
            });
    };

    if (loading) return <PinkLoader />;

    return (
        <div className=''>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                            Contact Requests by Users
                        </h2>

                        {requests.length === 0 ? (
                            <p className="text-center text-gray-500">No pending contact requests found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border border-gray-300">
                                    <thead>
                                        <tr className="bg-pink-100 text-gray-700 text-sm uppercase">
                                            <th className="border px-4 py-3">#</th>
                                            <th className="border px-4 py-3">Requester's emaill</th>
                                            <th className="border px-1 py-3">BioData No:</th>
                                            <th className="border px-4 py-3">BioData User Name</th>
                                            <th className="border px-4 py-3">Request of BioData Email</th>
                                            <th className="border px-1 py-3">Price</th>
                                            <th className="border px-2 py-3">Transaction ID</th>
                                            <th className="border px-4 py-3">Date</th>
                                            <th className="border px-4 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center text-sm text-gray-600">
                                        {requests.map((payment, i) => (
                                            <tr key={payment._id} className="hover:bg-pink-50 transition-all">
                                                <td className="border px-4 py-2">{i + 1}</td>
                                                <td className="border px-4 py-2">{payment.userEmail}</td>
                                                <td className="border px-1 py-2">{payment.serialNumber || 'N/A'}</td>
                                                <td className="border px-4 py-2 font-medium">{payment.name}</td>
                                                <td className="border px-4 py-2">{payment.contactEmail}</td>
                                                <td className="border px-1 py-2 text-green-600 font-semibold">${payment.price}</td>
                                                <td className="border px-2 py-2">{payment.transactionId}</td>
                                                <td className="border px-4 py-2">
                                                    {payment.date ? new Date(payment.date).toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="border px-4 py-2">
                                                    <button
                                                        onClick={() => handleRequestApproved(payment._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md transition"
                                                    >
                                                        Approve
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ApprovedContactRequest;