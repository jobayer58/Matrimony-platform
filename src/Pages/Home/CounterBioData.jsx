import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaFemale, FaMale } from 'react-icons/fa';
import { BiMaleFemale } from 'react-icons/bi';
import { MdWorkspacePremium } from 'react-icons/md';

const CounterBioData = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    return (
        <section className="bg-white py-16 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
                    Journey of Love in Numbers
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Discover how many people have trusted our platform. From countless biodatas to successful marriages, our growing numbers speak for themselves. Join the journey to find your perfect match.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
                {/* Total Biodata */}
                <div className="bg-gradient-to-r from-lime-500 to-lime-600 text-white py-10 px-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                    <BiMaleFemale className="text-6xl mb-4" />
                    <p className="text-lg font-medium">Total Biodata</p>
                    <h2 className="text-4xl font-bold mt-1">{stats?.totalBioData || 0}</h2>
                </div>

                {/* Male */}
                <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white py-10 px-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                    <FaMale className="text-6xl mb-4" />
                    <p className="text-lg font-medium">Male</p>
                    <h2 className="text-4xl font-bold mt-1">{stats?.totalMale || 0}</h2>
                </div>

                {/* Female */}
                <div className="bg-gradient-to-r from-indigo-400 to-indigo-500 text-white py-10 px-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                    <FaFemale className="text-6xl mb-4" />
                    <p className="text-lg font-medium">Female</p>
                    <h2 className="text-4xl font-bold mt-1">{stats?.totalFemale || 0}</h2>
                </div>

                {/* Successful Marriages */}
                <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-10 px-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center">
                    <MdWorkspacePremium className="text-6xl mb-4" />
                    <p className="text-lg font-medium">Successful Marriages</p>
                    <h2 className="text-4xl font-bold mt-1">❤️ {stats?.totalMarriages || 8}+</h2>
                </div>
            </div>
        </section>
    );
};

export default CounterBioData;
