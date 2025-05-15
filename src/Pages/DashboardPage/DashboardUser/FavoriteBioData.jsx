import React from 'react';
import UseFavorite from '../../../Hooks/UseFavorite';

const FavoriteBioData = () => {
    const [favorite] = UseFavorite()
    return (
        <div>
            <p>{favorite.length}</p>
        </div>
    );
};

export default FavoriteBioData;