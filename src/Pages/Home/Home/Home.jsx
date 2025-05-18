import React from 'react';
import Banner from '../Banner/Banner';
import UseAuth from '../../../Hooks/UseAuth';
import PinkLoader from '../../Shared/PinkLoader';
import HowItWorks from '../HowItWorks';
import PremiumBioData from '../PremiumBioData';
import SuccessStorySection from '../SuccessStorySection';

const Home = () => {
    const {loading} = UseAuth()
    if (loading) {
        return <PinkLoader></PinkLoader>
    }
    return (
        <div>
            <Banner></Banner>
            <PremiumBioData></PremiumBioData>
            <HowItWorks></HowItWorks>
            <SuccessStorySection></SuccessStorySection>
            
        </div>
    );
};

export default Home;