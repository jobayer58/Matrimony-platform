import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseApprovedRequest = () => {
    
    const axiosSecure = UseAxiosSecure();
    const { data: premiumRequest = [], refetch } = useQuery({
      queryKey: ["premiumRequest"],
      queryFn: async () => {
        const res = await axiosSecure.get(`premiumRequest`);
        return res.data;
      },
    });
    return [premiumRequest, refetch];
};

export default UseApprovedRequest;