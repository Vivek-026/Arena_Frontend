import { useDispatch } from "react-redux";
import {authLogout} from "../auth/auth-slice"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  

function OwnerProfile(){
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth.userData);

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden h-full flex">
                    {/* Profile Section - Fixed 50% */}
                    <div className="w-1/2 border-r border-gray-200 bg-gradient-to-b from-white to-gray-50">
                        <div className="h-full flex flex-col p-6">
                            {/* Profile Header */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 shadow-lg">
                                        <i className="fas fa-user-tie text-3xl text-white"></i>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white"></div>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
                                <p className="text-base text-gray-600 capitalize">{user.role}</p>
                            </div>

                            {/* Profile Details */}
                            <div className="flex-1 space-y-4 min-h-0">
                                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                                        <i className="fas fa-info-circle text-green-500 mr-2 text-sm"></i>
                                        Personal Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                                            <i className="fas fa-envelope text-gray-400 mr-2 text-sm"></i>
                                            <div className="min-w-0 flex-1">
                                                <label className="text-xs font-medium text-gray-500">Email</label>
                                                <p className="text-sm text-gray-800 font-medium truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                                            <i className="fas fa-user-tag text-gray-400 mr-2 text-sm"></i>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500">Role</label>
                                                <p className="text-sm text-gray-800 font-medium capitalize">{user.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Owner Actions */}
                                <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                                        <i className="fas fa-cogs text-green-500 mr-2 text-sm"></i>
                                        Owner Actions
                                    </h3>
                                    <button 
                                        onClick={() => navigate('/createturf')} 
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium shadow-lg flex items-center justify-center text-sm"
                                    >
                                        <i className="fas fa-plus mr-2"></i>
                                        Create New Turf
                                    </button>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <div className="border-t border-gray-200 flex-shrink-0">
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium shadow-lg flex items-center justify-center text-sm"
                                >
                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Owner Dashboard Section - Scrollable 50% */}
                    <div className="w-1/2 flex flex-col">
                        <div className="p-8 border-b border-gray-200 bg-white">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                    <i className="fas fa-building text-green-500 mr-3"></i>
                                    Owner Dashboard
                                </h2>
                                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    Turf Owner
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                            <div className="space-y-6">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-chart-line text-green-600 text-xl"></i>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Total Turfs</h3>
                                                <p className="text-2xl font-bold text-gray-900">-</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-calendar-check text-blue-600 text-xl"></i>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                                                <p className="text-2xl font-bold text-gray-900">-</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                                        Quick Actions
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button 
                                            onClick={() => navigate('/createturf')}
                                            className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
                                        >
                                            <i className="fas fa-plus text-green-600 mr-3"></i>
                                            <span className="text-green-800 font-medium">Create New Turf</span>
                                        </button>
                                        
                                        <button 
                                            onClick={() => navigate('/ownerbookings')}
                                            className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                                        >
                                            <i className="fas fa-list text-blue-600 mr-3"></i>
                                            <span className="text-blue-800 font-medium">View My Bookings</span>
                                        </button>
                                    
                                    </div>
                                </div>

                                {/* Welcome Message */}
                                <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2">Welcome, {user.name}!</h3>
                                    <p className="text-green-100">
                                        Manage your turfs, track bookings, and grow your sports venue business from this dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnerProfile;