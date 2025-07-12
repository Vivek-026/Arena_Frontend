import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userData = useSelector((state) => state.auth.userData);
    const role = userData.role;

    return (
        <header className="bg-white p-4 shadow-lg border-b border-gray-100">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo/Brand Section */}
                <div className="flex items-center">
                    <Link 
                        to={'/'} 
                        className="text-3xl font-bold text-gray-800 hover:text-green-600 transition-colors duration-300 tracking-wide"
                    >
                        ARENA
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex gap-6 items-center">
                    <Link 
                        to={'/'} 
                        className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                        Home
                    </Link>
                    
                    {role === 'owner' ? (
                        <Link 
                            to={'/ownerbookings'} 
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                            View Bookings
                        </Link>
                    ) : (
                        <Link 
                            to={'/turf'} 
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                            Turf
                        </Link>
                    )}
                    
                    <Link 
                        to={'/about'} 
                        className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                        About
                    </Link>

                    {isLogin ? (
                        <Link 
                            to={role === 'user' ? '/userprofile' : '/ownerprofile'} 
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link 
                            to={'/login'} 
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
                        >
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;