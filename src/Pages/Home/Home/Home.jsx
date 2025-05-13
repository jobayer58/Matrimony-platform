import React from 'react';
import Banner from '../Banner/Banner';
import UseAuth from '../../../Hooks/UseAuth';
import PinkLoader from '../../Shared/PinkLoader';

const Home = () => {
    const {loading} = UseAuth()
    if (loading) {
        return <PinkLoader></PinkLoader>
    }
    return (
        <div>
            <Banner></Banner>
            
        </div>
    );
};

export default Home;