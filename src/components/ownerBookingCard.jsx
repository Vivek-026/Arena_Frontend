const OwnerBookingCard = ({venue, user, date, time, sport, amount, payment, duration}) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getPaymentStatus = (status) => {
        return status === 'paid' 
            ? 'bg-green-100 text-green-800 border-green-200' 
            : 'bg-yellow-100 text-yellow-800 border-yellow-200';
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden m-2">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold truncate flex-1">{venue}</h3>
                    <span className="text-sm font-medium bg-green-400 px-2 py-1 rounded">{sport}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">
                            {user.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{user}</p>
                        <p className="text-sm text-gray-500">Customer</p>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-600 font-medium">Date</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{formatDate(date)}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-600 font-medium">Time</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{time}</p>
                    </div>
                </div>

                {/* Duration */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-600 font-medium">Duration</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{duration} hours</p>
                </div>

                {/* Amount and Payment */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">₹{amount}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatus(payment)}`}>
                        {payment.charAt(0).toUpperCase() + payment.slice(1)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerBookingCard;