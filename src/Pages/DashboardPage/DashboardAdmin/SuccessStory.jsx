import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const SuccessStory = () => {
    const axiosSecure = UseAxiosSecure();
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);

    useEffect(() => {
        axiosSecure.get('/successStory').then(res => {
            setStories(res.data);
        });
    }, [axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
                Success Stories Overview
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse border border-pink-300">
                    <thead className="bg-pink-100">
                        <tr>
                            <th className="border border-pink-300 px-4 py-2">Submit User Email</th>
                            <th className="border border-pink-300 px-4 py-2">Male ID</th>
                            <th className="border border-pink-300 px-4 py-2">Female ID</th>
                            <th className="border border-pink-300 px-4 py-2">Marriage Date</th>
                            <th className="border border-pink-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story._id} className="hover:bg-pink-50">
                                <td className="border border-pink-300 px-4 py-2 text-xs">{story.userEmail}</td>
                                <td className="border border-pink-300 px-4 py-2"># {story.maleBiodataId}</td>
                                <td className="border border-pink-300 px-4 py-2"># {story.femaleBiodataId}</td>
                                <td className="border border-pink-300 px-4 py-2">{story.marriageDate}</td>
                                <td className="border border-pink-300 px-4 py-2">
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        View Story
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedStory && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-pink-200 p-6 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
                            title="Close"
                        >
                            &times;
                        </button>

                        {/* Image */}
                        <img
                            src={selectedStory.imageUrl}
                            alt="Couple"
                            className="w-full h-52 object-cover rounded-lg mb-4 border"
                        />

                        {/* User Email */}
                        <p className="text-sm text-gray-500 mb-2">
                            <span className="font-semibold text-gray-700">Submitted by:</span> {selectedStory.userEmail}
                        </p>

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-pink-700 mb-3">
                            Success Story of Biodata {selectedStory.maleBiodataId} & {selectedStory.femaleBiodataId}
                        </h2>

                        {/* Story Content */}
                        <div className="relative bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-md p-4 max-h-48 overflow-y-auto shadow-inner">
                            <div className="absolute left-3 top-1 text-pink-400 text-3xl select-none">“</div>
                            <p className="text-gray-800 text-sm pl-6 pr-2 leading-relaxed whitespace-pre-line">
                                {selectedStory.story}
                            </p>
                            <div className="absolute right-3 bottom-1 text-pink-400 text-3xl select-none">”</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SuccessStory;
