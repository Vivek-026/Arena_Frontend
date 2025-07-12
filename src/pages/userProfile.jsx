import { useDispatch } from "react-redux";
import {authLogout} from "../auth/auth-slice"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  
import BookingCard from "../components/bookingcard";
import getBookingById from "../api/getBooking";
import { useState } from "react";
import { useEffect } from "react";

function UserProfile(){
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth.userData);

    const [data,setData] = useState([]);

    const getData=async()=>{
        const response = await getBookingById(user._id);
        setData(response.data.data);
        const data = data.reverse();
        setData(data);
    }
    useEffect(()=>{
        getData();
    },[])

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
                                    <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-4 shadow-lg">
                                        <i className="fas fa-user text-3xl text-white"></i>
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
                                        <i className="fas fa-info-circle text-blue-500 mr-2 text-sm"></i>
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

                    {/* Bookings Section - Scrollable 50% */}
                    <div className="w-1/2 flex flex-col">
                        <div className="p-8 border-b border-gray-200 bg-white">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                                    <i className="fas fa-calendar-check text-blue-500 mr-3"></i>
                                    Your Bookings
                                </h2>
                                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {data.length} {data.length === 1 ? 'Booking' : 'Bookings'}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                            {data.length > 0 ? (
                                <div className="space-y-6">
                                    {data.map((item) => (
                                        <BookingCard key={item._id} data={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <i className="fas fa-calendar-times text-6xl mb-4 text-gray-300"></i>
                                    <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
                                    <p className="text-center">You haven't made any bookings yet. Start exploring and book your first turf!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;