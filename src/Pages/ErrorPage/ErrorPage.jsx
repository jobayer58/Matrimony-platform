import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-600 mb-6">Oops! Page Not Found</h2>
                    <p className="text-lg text-gray-500 mb-6">
                        The page you're looking for might have been moved or deleted.
                    </p>
                    <a
                        href="/"
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;