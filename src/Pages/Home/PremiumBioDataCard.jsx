import React from 'react';
import { Link } from 'react-router';

const PremiumBioDataCard = ({ bio }) => {
    const { profileImage, serialNumber, biodataType, occupation, permanentDivision, age } = bio

    return (
        <div>
            <div className="relative bg-white rounded-xl hover:shadow-2xl transition-all duration-300 border-pink-400 border overflow-hidden group">
                {/* Profile Section */}
                <div className="flex flex-col items-center p-5">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-26 h-26 object-cover rounded-full border-4 border-pink-100 shadow-md"
                    />
                    <h3 className="mt-3 font-bold text-lg">Biodata #{serialNumber}</h3>
                    <p className="text-gray-500 text-sm">{biodataType}</p>
                </div>

                {/* Info Section */}
                <div className="px-5 pb-5 text-sm text-gray-700 ">
                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2 ">
                            <span className="inline-block w-20 font-medium text-gray-600 ">Age:</span>
                            <span className="text-gray-800">{age} years</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-20 font-medium text-gray-600">Occupation:</span>
                            <span className="text-gray-800">{occupation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-20 font-medium text-gray-600">Division:</span>
                            <span className="text-gray-800">{permanentDivision}</span>
                        </div>
                    </div>
                </div>


                {/* View Profile Button */}
                <div className="px-5 pb-5">
                    <Link
                        to={`/matches/${bio._id}`}
                        className="block w-full text-center bg-pink-600 text-white font-medium py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PremiumBioDataCard;