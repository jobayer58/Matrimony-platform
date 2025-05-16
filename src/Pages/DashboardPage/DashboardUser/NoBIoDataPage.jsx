import { Clipboard } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const NoBIoDataPage = () => {
    return (
        <div>
            <div className="bg-gradient-to-r from-pink-50 to-indigo-50 min-h-[70vh] flex flex-col items-center justify-center p-6 text-center min-h-screen">
                <div className="max-w-md mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <Clipboard className="h-16 w-16 mx-auto text-indigo-400"></Clipboard>
                        <h2 className="text-2xl font-bold text-gray-800 mt-4">You have no BioData.</h2>
                        <p className="text-gray-600 mt-2">Create a BioData and increase your chances of marriage</p>
                        
                        <Link 
                            to="/dashboard/editBioData"
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                        >
                            Create New BioData
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoBIoDataPage;