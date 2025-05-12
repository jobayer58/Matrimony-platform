import React from 'react';
import Navbar from '../Pages/Shared/Navbar/NAvbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;