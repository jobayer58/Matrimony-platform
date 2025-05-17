import React from 'react';
import UseFavorite from '../../../Hooks/UseFavorite';
import { Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const FavoriteBioData = () => {
    const [favorite, refetch] = UseFavorite()
    const axiosSecure = UseAxiosSecure()

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/favorite/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className="p-4">
                <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
                    My Favourite Biodata
                </h2>

                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-pink-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-pink-100 text-pink-800 text-base font-semibold">
                            <tr>
                                <th className="px-4 py-4 border-b">#</th>
                                <th className="px-4 py-4 border-b">Photo</th>
                                <th className="px-4 py-4 border-b">Name</th>
                                <th className="px-4 py-4 border-b">Biodata ID</th>
                                <th className="px-4 py-4 border-b">Permanent Address</th>
                                <th className="px-4 py-4 border-b">Occupation</th>
                                <th className="px-4 py-4 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                favorite.length > 0 ? favorite.map((bio, index) => (
                                    <tr key={bio._id} className="hover:bg-pink-50 transition duration-300">
                                        <td className="px-4 py-4 border-b">{index + 1}</td>
                                        <td className="px-4 py-4 border-b">
                                            <img
                                                src={bio.profileImage}
                                                alt={bio.name}
                                                className="lg:w-20 lg:h-20 rounded-full object-cover border border-pink-300"
                                            />
                                        </td>
                                        <td className="px-4 py-4 border-b">{bio.name}</td>
                                        <td className="px-4 py-4 border-b">{bio.serialNumber}</td>
                                        <td className="px-4 py-4 border-b">{bio.permanentDivision}</td>
                                        <td className="px-4 py-4 border-b">{bio.occupation}</td>
                                        <td className="px-4 py-4 border-b text-center">
                                            <button
                                                onClick={() => handleDelete(bio._id)}
                                                className="text-pink-600 hover:text-white hover:bg-pink-500 p-2 rounded-full transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-gray-500 py-6">
                                            No favorites found.
                                        </td>
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

export default FavoriteBioData;