import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';

const UseFavorite = () => {
    const axiosSecure = UseAxiosSecure()
    const { user } = UseAuth()
    const { refetch, data: favorite = [] } = useQuery({
        queryKey: ['favorite'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite?email=${user.email}`)
            return res.data
        }
    })


    return [favorite, refetch]
};

export default UseFavorite;