import React, { useEffect, useState } from 'react';
import MatchesCard from './MatchesCard';
import UseAuth from '../../Hooks/UseAuth';
import { PulseLoader } from 'react-spinners';
import PinkLoader from '../Shared/PinkLoader';

const Matches = () => {
    const [bioData, setBioData] = useState([]);
    const { loading } = UseAuth()
    const [filters, setFilters] = useState({
        type: '',
        division: '',
        ageMin: '',
        ageMax: ''
    });

    useEffect(() => {
        fetch('https://matrimony-server-mu.vercel.app/matchesBio')
            .then(res => res.json())
            .then(data => {
                setBioData(data);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredData = bioData.filter(bio => {
        const matchType = filters.type ? bio.biodataType === filters.type : true;
        const matchDivision = filters.division ? bio.permanentDivision === filters.division : true;
        const matchMinAge = filters.ageMin ? parseInt(bio.age) >= parseInt(filters.ageMin) : true;
        const matchMaxAge = filters.ageMax ? parseInt(bio.age) <= parseInt(filters.ageMax) : true;

        return matchType && matchDivision && matchMinAge && matchMaxAge;
    });

    if (loading) {
        return <PinkLoader></PinkLoader>
    }

    return (
        <div className='bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 '>
            <div className="max-w-[1300px]  mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-6 ">

                {/* Filter Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white p-4 shadow rounded border-none sticky top-4 self-start">
                        <h2 className="text-lg font-semibold mb-4">Filter Options</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Biodata Type</label>
                                <select
                                    name="type"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                >
                                    <option value="">All</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Permanent Division</label>
                                <select
                                    name="division"
                                    value={filters.division}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                >
                                    <option value="">All</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Age Range</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        name="ageMin"
                                        value={filters.ageMin}
                                        onChange={handleFilterChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder="Min"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        name="ageMax"
                                        value={filters.ageMax}
                                        onChange={handleFilterChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biodata Cards */}
                <div className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            filteredData.map((bio) => (
                                <MatchesCard key={bio._id} bio={bio} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Matches;
