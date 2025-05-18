import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { Crown, UserPlus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseApprovedRequest from '../../../Hooks/UseApprovedRequest';

const AllUser = () => {
    const [premiumRequest] = UseApprovedRequest();
    const axiosSecure = UseAxiosSecure();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    useEffect(() => {
        const lowercased = searchTerm.toLowerCase();
        const filtered = users.filter(user => user.name.toLowerCase().includes(lowercased));
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleRequestApproved = (email) => {
        axiosSecure
            .patch(`/premiumRequest?email=${email}`, { status: "Approved" })
            .then((res) => {
                const premiumModified = res.data?.premiumRequestUpdate?.modifiedCount || 0;
                const roleModified = res.data?.userRoleUpdate?.modifiedCount || 0;

                if (premiumModified > 0 || roleModified > 0) {
                    Swal.fire({
                        title: "Approved",
                        text: "Premium request accepted successfully",
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

    return (
        <div className='lg:ml--0 md:ml-8'>
            <div className='px-4 md:px-10 lg:px-20 py-10 bg-gradient-to-b from-indigo-50 to-white min-h-screen'>
                <h2 className="text-4xl font-bold text-center text-indigo-800 mb-8">👥 Manage Users</h2>

                {/* Search Bar */}
                <form className="mb-8 max-w-md mx-auto flex shadow-md rounded overflow-hidden" onSubmit={e => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="🔍 Search by username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-5 py-2 hover:bg-indigo-700 font-medium">
                        Search
                    </button>
                </form>

                {/* Table */}
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4 text-center">Make Admin</th>
                                <th className="px-6 py-4 text-center">Make Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                <tr key={user._id} className="even:bg-indigo-50 hover:bg-indigo-100 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className={`${user.role === 'admin'
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                                } text-white px-4 py-1.5 rounded-md flex items-center justify-center gap-1 mx-auto shadow`}
                                            disabled={user.role === 'admin'}
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            {user.role === 'admin' ? "Admin" : "Make Admin"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleRequestApproved(user.email)}
                                            className={`${user.role === 'premium'
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-yellow-500 hover:bg-yellow-600'
                                                } text-white px-4 py-1.5 rounded-md flex items-center justify-center gap-1 mx-auto shadow`}
                                            disabled={user.role === 'premium'}
                                        >
                                            <Crown className="w-4 h-4" />
                                            {user.role === 'premium' ? "Premium" : "Make Premium"}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-500 py-10">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUser;
