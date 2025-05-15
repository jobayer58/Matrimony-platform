import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = UseAxiosSecure()

    // Fetch users from server (with optional search term)
    const fetchUsers = async (name = "") => {
        try {
            const res = await axiosSecure.get(`http://localhost:5000/userss?search=${name}`);
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/users');
    //         return res.data;
    //     }
    // })
    // useEffect(() => {
    //     fetchUsers('http://localhost:5000/users');
    // }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers(searchTerm);
    };

    // const makeAdmin = async (id) => {
    //     try {
    //         await axiosSecure.patch(`/api/users/admin/${id}`);
    //         fetchUsers(searchTerm); // Refresh after update
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const makePremium = async (id) => {
    //     try {
    //         await axiosSecure.patch(`/api/users/premium/${id}`);
    //         fetchUsers(searchTerm); // Refresh after update
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div className='md:pl-14 lg:pl-0 pl-0'>
             <div className="p-4">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">Manage Users</h2>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4 max-w-sm mx-auto flex">
                <input
                    type="text"
                    placeholder="Search by username..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700">
                    Search
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm text-left border border-gray-200">
                    <thead className="bg-indigo-100 text-indigo-800 font-semibold">
                        <tr>
                            <th className="px-4 py-3 border-b">User Name</th>
                            <th className="px-4 py-3 border-b">Email</th>
                            <th className="px-4 py-3 border-b text-center">Make Admin</th>
                            <th className="px-4 py-3 border-b text-center">Make Premium</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ? users.map(user => (
                                <tr key={user._id} className="hover:bg-indigo-50 transition">
                                    <td className="px-4 py-3 border-b">{user.name}</td>
                                    <td className="px-4 py-3 border-b">{user.email}</td>
                                    <td className="px-4 py-3 border-b text-center">
                                        <button
                                            // onClick={() => makeAdmin(user._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 mx-auto"
                                            disabled={user.role === 'admin'}
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            {user.role === 'admin' ? "Admin" : "Make Admin"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 border-b text-center">
                                        <button
                                            // onClick={() => makePremium(user._id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1 mx-auto"
                                            disabled={user.role === 'premium'}
                                        >
                                            <Crown className="w-4 h-4" />
                                            {user.role === 'premium' ? "Premium" : "Make Premium"}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-500 py-6">No users found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default AllUser;