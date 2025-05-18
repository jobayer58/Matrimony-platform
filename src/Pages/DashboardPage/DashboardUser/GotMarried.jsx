import React, { useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const GotMarried = () => {

    const axiosSecure = UseAxiosSecure()
    const {user} =UseAuth()
    const [formData, setFormData] = useState({
        maleBiodataId: '',
        femaleBiodataId: '',
        marriageDate: '',
        imageUrl: '',
        story: '',
        user: user?.email
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
      
        // SweetAlert2 Confirmation
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to submit this success story?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, submit it!'
        });
      
        if (result.isConfirmed) {
          const newStory = {
            ...formData,
            userEmail: user?.email || 'anonymous'
          };
      
          try {
            const res = await axiosSecure.post('/successStory', newStory);
            if (res.data.insertedId) {
              Swal.fire('Submitted!', 'Your success story has been submitted.', 'success');
              // Optional: Clear form
              setFormData({
                maleBiodataId: '',
                femaleBiodataId: '',
                marriageDate: '',
                imageUrl: '',
                story: '',
                user: user?.email
              });
            }
          } catch (error) {
            // console.error(error);
            Swal.fire(error, 'Something went wrong.', 'error');
          }
        }
      };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">Got Married Form</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
                {/* Self Biodata ID */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Your Biodata ID</label>
                    <input
                        type="text"
                        name="maleBiodataId"
                        value={formData.maleBiodataId}
                        onChange={handleChange}
                        placeholder="e.g. 1001"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-pink-500"
                        required
                    />
                </div>

                {/* Partner Biodata ID */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Partner Biodata ID</label>
                    <input
                        type="text"
                        name="femaleBiodataId"
                        value={formData.femaleBiodataId}
                        onChange={handleChange}
                        placeholder="e.g. 1002"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-pink-500"
                        required
                    />
                </div>

                {/* Marriage Date */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Marriage Date</label>
                    <input
                        type="date"
                        name="marriageDate"
                        value={formData.marriageDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-pink-500"
                        required
                    />
                </div>

                {/* Couple Image URL */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Couple Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="e.g. https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-pink-500"
                        required
                    />
                </div>

                {/* Story */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Success Story</label>
                    <textarea
                        name="story"
                        value={formData.story}
                        onChange={handleChange}
                        placeholder="Write your experience..."
                        className="w-full border border-gray-300 rounded-lg p-2 h-28 resize-none focus:outline-pink-500"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Submit Success Story
                </button>
            </form>
        </div>
    );
};

export default GotMarried;
