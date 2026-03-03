import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorNavbar from './VendorNavbar';
import { Footer } from './Footer';

const VendorLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navbar */}
            <VendorNavbar />

            {/* Page Content */}
            <main className="flex-grow w-full relative">
                {/* Subtle background flourishes */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/20 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

                <div className="relative z-10 w-full">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default VendorLayout;
