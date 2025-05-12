import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import banner1 from '../../../assets/banner1.jpeg';
import banner2 from '../../../assets/banner2.jpeg';
import banner8 from '../../../assets/banner8.jpeg';

const images = [banner1, banner2, banner8];

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
            setNext((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative lg:h-[600px] h-screen w-full overflow-hidden">
            <div
                className="absolute top-0 left-0 h-full w-full bg-cover bg-center object-cover items-center justify-center"
                style={{ backgroundImage: `url(${images[current]})` }}
            />

            <AnimatePresence>
                <motion.div
                    key={next}
                    className="absolute top-0 left-0 h-full w-full bg-cover bg-center object-cover items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{ backgroundImage: `url(${images[next]})` }}
                />
            </AnimatePresence>
            <div className="absolute top-0 left-0 h-full w-full  bg-opacity-50 flex items-center justify-center ">
                <div className="text-center text-white px-6 ">
                    {/* text-[#c48c46] text-[#66451c] */}
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-red-500 ">
                        Find Your Perfect Match
                    </h1>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                        Trusted Matrimony Service connecting hearts across the globe.
                    </p>
                    <button className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-full text-white font-medium shadow-lg">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
