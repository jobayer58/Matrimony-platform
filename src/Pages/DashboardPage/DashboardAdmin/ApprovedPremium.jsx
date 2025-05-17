import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import UseApprovedRequest from '../../../Hooks/UseApprovedRequest';

const ApprovedPremium = () => {
    const axiosSecure = UseAxiosSecure()
    const [premiumRequest, refetch] = UseApprovedRequest()

    const handleRequestApproved = (status, email) => {
        axiosSecure
          .patch(`/premiumRequest?email=${email}`, { status })
          .then((res) => {
            console.log(res.data);
      
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

      const handleRequestReject = (status, email) => {
        // console.log(email)
        axiosSecure
          .patch(`/premiumRequest?email=${email}`, { status })
          .then((res) => {
            console.log(res.data);
            const premiumModified = res.data?.premiumRequestUpdate?.modifiedCount || 0;
            const roleModified = res.data?.userRoleUpdate?.modifiedCount || 0;
      
            if (premiumModified > 0 || roleModified > 0) {
              Swal.fire({
                title: "Rejected",
                text: "Premium request rejected",
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
        <div>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Premium Requests</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-pink-200">
                            <thead>
                                <tr className="bg-pink-100 text-pink-700 text-left">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">User Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Requested At</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-100">
                                {premiumRequest.map((req, index) => (
                                    <tr key={req._id} className="hover:bg-pink-50 transition">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2 font-medium">{req.name}</td>
                                        <td className="px-4 py-2">{req.email}</td>
                                        <td className="px-4 py-2">
                                            {new Date(req.date).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </td>
                                        <td className="px-4 py-2 text-center space-x-2">
                                            <button
                                                 onClick={() => handleRequestApproved("Approved", req.email)}
                                                className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                 onClick={() =>
                                                    handleRequestReject("Reject", req?.email)
                                                  }
                                                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {premiumRequest.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No premium requests found.
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

export default ApprovedPremium;