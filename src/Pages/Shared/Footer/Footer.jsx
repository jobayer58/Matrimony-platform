import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1  md:grid-cols-4 gap-8">
                {/* Logo & About */}
                <div>
                    <div className='flex items-center gap-2'>
                        <img src="/src/assets/love.png" className='md:h-14 md:w-14 h-10 w-10 object-cover' alt="logo" />
                    <h2 className="text-2xl font-bold text-white"> Matrimony</h2>
                    </div>
                    <p className="mt-4 text-sm text-gray-400">
                        Connecting hearts with love and respect. Your journey to a blessed marriage begins here.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Matches</a></li>
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">FAQs</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white">Help Center</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: <a href="mailto:support@matrimony.com" className="hover:text-white">support@matrimony.com</a></li>
                        <li>Phone: +880-1234-567890</li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
                © 2025 ❤️ Matrimony. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;