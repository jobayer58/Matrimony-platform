import React from 'react';
import Banner from '../Banner/Banner';
import UseAuth from '../../../Hooks/UseAuth';
import PinkLoader from '../../Shared/PinkLoader';
import HowItWorks from '../HowItWorks';

const Home = () => {
    const {loading} = UseAuth()
    if (loading) {
        return <PinkLoader></PinkLoader>
    }
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            
        </div>
    );
};

export default Home;