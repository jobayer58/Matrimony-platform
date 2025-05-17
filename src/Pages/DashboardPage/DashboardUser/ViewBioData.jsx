import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import PinkLoader from '../../Shared/PinkLoader';
import { NavLink } from 'react-router';
import NoBIoDataPage from './NoBIoDataPage';
import Swal from 'sweetalert2';

const ViewBioData = () => {
    // const { id } = useParams();
    const { user, loading, setLoading } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [bioData, setBioData] = useState(null);


    useEffect(() => {
        const fetchBioData = async () => {
            try {
                const res = await axiosSecure.get(`/myBioData?email=${user?.email}`);
                setBioData(res.data);
                setLoading(true)
            } catch (error) {
                console.error('Error fetching bio data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchBioData();
        }
    }, [user?.email, axiosSecure]);

    if (loading) {
        return <PinkLoader></PinkLoader>
    }

    if (!bioData) {
        return <NoBIoDataPage></NoBIoDataPage>
    }

    const { biodataNo, profileImage, name, biodataType, dateOfBirth, age, height, weight, occupation, race, fathersName, mothersName, permanentDivision, presentDivision, expectedPartnerAge, expectedPartnerHeight, expectedPartnerWeight, contactEmail, mobileNumber
    } = bioData;

    const handleRequestPremium = () => {
        Swal.fire({
            title: "Are you sure to make you premium?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post("/premiumRequest", {
                    serialNumber: bioData?.serialNumber,
                    name: bioData?.name,
                    email: bioData?.contactEmail, 
                    date: new Date().toISOString(),
                    status: "pending",
                })
                .then((res) => {
                  if (res.data.message) {
                    Swal.fire({
                      title: "Request failed!",
                      text: res.data?.message,
                      icon: "error",
                      timer: 3000,
                    });
                  }
                  if (res.data?.insertedId) {
                    Swal.fire({
                      title: "Request submitted!",
                      text: "You’ll be notified once the admin approves it.",
                      icon: "success",
                      timer: 3000,
                    });
                  }
                })
                .catch(() => {
                  Swal.fire({
                    title: "Request failed!",
                    text: "Please try again.",
                    icon: "error",
                    timer: 3000,
                  });
                });
            }
          });
    }


    return (
        <div className='bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 py-10 min-h-screen'>
            <div className="max-w-[1000px] mx-auto p-6 bg-gradient-to-br from-pink-100 via-white to-pink-200 shadow-md rounded-md ">
                <h2 className="text-2xl font-bold mb-4">BioData ID: {biodataNo}</h2>

                <div className="flex flex-col lg:flex-row gap-6 ">
                    <img src={profileImage} alt="Profile" className="w-60 h-60 object-cover rounded-lg" />

                    <div className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-800">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Gender:</strong> {biodataType}</p>
                            <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
                            <p><strong>Age:</strong> {age}</p>
                            <p><strong>Height:</strong> {height}</p>
                            <p><strong>Weight:</strong> {weight}</p>
                            <p><strong>Occupation:</strong> {occupation}</p>
                            <p><strong>Race:</strong> {race}</p>
                            <p><strong>Father's Name:</strong> {fathersName}</p>
                            <p><strong>Mother's Name:</strong> {mothersName}</p>
                            <p><strong>Permanent Division:</strong> {permanentDivision}</p>
                            <p><strong>Present Division:</strong> {presentDivision}</p>
                            <p><strong>Expected Partner Age:</strong> {expectedPartnerAge}</p>
                            <p><strong>Expected Partner Height:</strong> {expectedPartnerHeight}</p>
                            <p><strong>Expected Partner Weight:</strong> {expectedPartnerWeight}</p>
                        </div>

                        <div className="p-4 border border-green-400 rounded-md bg-green-50 shadow-sm">
                            <h3 className="font-semibold text-lg mb-2 text-green-700">Contact Information</h3>
                            <p><strong>Email:</strong> {contactEmail}</p>
                            <p><strong>Phone:</strong> {mobileNumber}</p>
                        </div>

                        {/* Submit button */}
                        <div onClick={handleRequestPremium} className="mt-8 text-center">
                            <button
                                type="submit"
                                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                            >
                                Request For Premium BioData
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBioData;
