import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/UseAuth';
import { useLoaderData, useNavigate } from 'react-router';
import SimilarMatchesCard from './SimilarMatchesCard';
import PinkLoader from '../Shared/PinkLoader';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import UseFavorite from '../../Hooks/UseFavorite';

const MatchesDetails = () => {
    // const loadedBiodata = useLoaderData();
    // const [biodata] = useState(loadedBiodata);
    const axiosSecure = UseAxiosSecure()
    const bioData = useLoaderData();
    const navigate = useNavigate()
    const { biodataNo, biodataType, name, profileImage, dateOfBirth, height, weight, age, occupation, race, fathersName, mothersName, permanentDivision, presentDivision, expectedPartnerAge, expectedPartnerHeight, expectedPartnerWeight, contactEmail, mobileNumber, _id } = bioData;

    const [similarBioData, setSimilarBioData] = useState([]);
    const { user, loading } = useAuth();
    const [refetch] = UseFavorite()

    const handleAddToFavorite = () => {
        if (user && user.email) {
            const bioItem = {
                bioId: _id,
                email: user.email,
                name,
                profileImage,
                permanentDivision,
                occupation
            }
            axiosSecure.post('/favorite', bioItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success('This Profile added your Favorite List!', {
                            position: "top-center",
                            closeOnClick: true,
                            transition: Zoom,
                        });
                        refetch()
                    }
                });
            // 
        } else {
            toast.warn('please login to add to the favorite')
            navigate('/login')
        }
    }

    useEffect(() => {
        if (!bioData) return;

        const gender = bioData.biodataType;

        fetch(`http://localhost:5000/matchesBio?gender=${gender}`)
            .then(res => res.json())
            .then(matched => {
                const filtered = matched
                    .filter(item => item._id !== bioData._id && item.biodataType === gender)
                    .slice(0, 3);

                setSimilarBioData(filtered);
                const timer = setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);

                return () => clearTimeout(timer);
            });
    }, [bioData]);



    const isPremium = user?.role === 'premium';
    if (loading) {
        return <PinkLoader></PinkLoader>
    }

    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className='bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 py-10'>
                <div className="max-w-[1000px] mx-auto p-6 bg-gradient-to-br from-pink-100 via-white to-pink-200  shadow-md rounded-md ">
                    <h2 className="text-2xl font-bold mb-4">BioData ID: {biodataNo}</h2>

                    <div className="flex flex-col md:flex-row gap-6 ">
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

                            {/* Contact Info Section */}
                            {isPremium ? (
                                <div className="p-4 border border-green-400 rounded-md bg-green-50 shadow-sm">
                                    <h3 className="font-semibold text-lg mb-2 text-green-700">Contact Information</h3>
                                    <p><strong>Email:</strong> {contactEmail}</p>
                                    <p><strong>Phone:</strong> {mobileNumber}</p>
                                </div>
                            ) : (
                                <div className="p-4 border border-gray-300 rounded-md bg-gray-100 text-sm italic text-gray-600">
                                    Contact info visible only to premium members
                                </div>
                            )}

                            {/* Action Buttons (No function attached) */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <button
                                    onClick={handleAddToFavorite}
                                    className="bg-pink-500 hover:bg-pink-600  text-white px-5 py-2 rounded-md shadow transition"
                                >
                                    Add to Favorites
                                </button>
                                <button
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-md shadow transition"
                                >
                                    Request Contact Info
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Similar BioData Section */}
                    {similarBioData.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold mb-4">Similar BioData</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {similarBioData.map(bio => (
                                    <SimilarMatchesCard key={bio._id} bio={bio}></SimilarMatchesCard>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchesDetails;
