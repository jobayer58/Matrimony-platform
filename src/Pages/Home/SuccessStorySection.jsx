import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SuccessStorySection = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('https://matrimony-server-mu.vercel.app/successStory')
            .then(res => setStories(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center text-pink-600 mb-10">Success Stories</h2>

            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
            >
                {stories.map((story, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-xl shadow-lg border border-pink-300 overflow-hidden text-center flex flex-col items-center">

                            {/* Full-width image */}
                            <img
                                src={story.imageUrl}
                                alt="Couple"
                                className="w-full h-64 object-cover"
                            />

                            {/* Content */}
                            <div className="p-6 md:p-10 max-h-[400px] overflow-y-auto">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                    Male ID: {story.maleBiodataId} | Female ID: {story.femaleBiodataId}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">Posted by: {story.userEmail}</p>

                                {/* Story Text */}
                                <p
                                    className="text-gray-800 text-lg leading-relaxed tracking-wide text-justify whitespace-pre-line px-2 md:px-4"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    {story.story}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SuccessStorySection;
