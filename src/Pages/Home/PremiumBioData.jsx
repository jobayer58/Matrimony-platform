import React, { useState } from 'react';
import PinkLoader from '../Shared/PinkLoader';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import PremiumBioDataCard from './PremiumBioDataCard';

const PremiumBioData = () => {
    const [sortOrder, setSortOrder] = useState('none'); // none | asc | desc

    const { data: premiumBiodatas = [], isLoading } = useQuery({
        queryKey: ['premiumBiodatas'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/premiumBiodatas');
            return res.data;
        },
    });

    const sortedBiodatas = [...premiumBiodatas].sort((a, b) => {
        if (sortOrder === 'asc') return a.age - b.age;
        if (sortOrder === 'desc') return b.age - a.age;
        return 0;
    });

    if (isLoading) {
        return <PinkLoader />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-10 text-pink-400">
               Our Premium Members
            </h1>

            {/* Filter Dropdown */}
            <div className="flex justify-end mb-6">
                <select
                    onChange={(e) => setSortOrder(e.target.value)}
                    value={sortOrder}
                    className="border border-pink-400 text-sm px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                    <option value="none">Sort by Age</option>
                    <option value="asc">Age: Low to High</option>
                    <option value="desc">Age: High to Low</option>
                </select>
            </div>

            {/* Biodata Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    sortedBiodatas.slice(0, 8).map((bio) => (
                        <PremiumBioDataCard key={bio._id} bio={bio} />
                    ))
                }
            </div>
        </div>
    );
};

export default PremiumBioData;
