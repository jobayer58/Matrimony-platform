import React from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const PremiumBioData = () => {
    const axiosSecure = UseAxiosSecure()

    const { data: premiumUsers = [] } = useQuery({
        queryKey: ['premiumUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premiumUsers');
            return res.data;
        }
    });
    return (
        <div>
            <div className="grid md:grid-cols-3 gap-6">
                {premiumUsers.map(user => (
                    <div key={user._id} className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-lg font-bold text-indigo-700">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded mt-2 text-xs">Premium Member</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumBioData;