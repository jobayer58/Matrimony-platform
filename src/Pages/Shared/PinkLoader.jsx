import React from 'react';
import { PulseLoader } from 'react-spinners';

const PinkLoader = () => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PulseLoader color="#ff69b4" size={15} />
                <span style={{ marginLeft: '10px', color: '#ff69b4' }}>Loading...</span>
            </div>
        </div>
    );
};

export default PinkLoader;