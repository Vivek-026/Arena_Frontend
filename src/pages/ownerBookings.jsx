import { useSelector } from "react-redux";
import getOwnerBookings from "../api/getBookingOwner";
import OwnerBookingCard from "../components/ownerBookingCard";
import { useEffect, useState } from "react";

const OwnerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = useSelector((state) => state.auth.userData._id);

    const getBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log(id);
            const response = await getOwnerBookings(id);
            console.log(response.data.data);
            setBookings(response.data.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setError("Failed to load bookings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading bookings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Bookings</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={getBookings}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                        <p className="text-gray-600 mt-2">Manage and view all your turf bookings</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600">You don't have any bookings yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Stats Bar */}
                        <div className="bg-gray-100 rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
                                        <p className="text-sm text-gray-600">Total Bookings</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">
                                            {bookings.filter(b => b.payment === 'paid').length}
                                        </p>
                                        <p className="text-sm text-gray-600">Paid</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">
                                            {bookings.filter(b => b.payment === 'pending').length}
                                        </p>
                                        <p className="text-sm text-gray-600">Pending</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">
                                            ₹{bookings.reduce((sum, b) => sum + b.price, 0)}
                                        </p>
                                        <p className="text-sm text-gray-600">Total Revenue</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={getBookings}
                                    className="px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                >
                                    
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>

                        {/* Bookings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookings.map((book, index) => (
                                <OwnerBookingCard
                                    key={index}
                                    venue={book.turf.name}
                                    user={book.user.name}
                                    date={book.date}
                                    time={book.startTime}
                                    sport={book.sport}
                                    amount={book.price}
                                    payment={book.payment}
                                    duration={book.duration}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OwnerBookings;