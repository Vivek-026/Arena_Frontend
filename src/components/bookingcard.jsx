import { useEffect } from "react";
import { useState } from "react";
import getById from "../api/getById";

function BookingCard({data}){
    console.log("from booking card",data);
    const [turf,setTurf] = useState('');

    const getTurf=async()=>{
        const response = await getById(data.turf);
        console.log("turf",response.data.data);
        setTurf(response.data.data.name);
    }
    
    useEffect(()=>{
        getTurf();
    },[])

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        
        return date.toLocaleDateString('en-US', options);
    };

    // Get status styling
    const getStatusStyle = (status) => {
        switch(status?.toLowerCase()) {
            case 'confirmed':
            case 'booked':
                return 'bg-green-100 text-green-800 border border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'cancelled':
            case 'rejected':
                return 'bg-red-100 text-red-800 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch(status?.toLowerCase()) {
            case 'confirmed':
            case 'booked':
                return 'fas fa-check-circle';
            case 'pending':
                return 'fas fa-clock';
            case 'cancelled':
            case 'rejected':
                return 'fas fa-times-circle';
            default:
                return 'fas fa-info-circle';
        }
    };
    
    return(
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="flex flex-col space-y-5">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center mb-2">
                            <i className="fas fa-futbol text-green-500 mr-2"></i>
                            <h3 className="text-xl font-bold text-gray-800">{turf || 'Loading...'}</h3>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-running text-blue-500 mr-2 text-sm"></i>
                            <p className="text-sm text-gray-600 font-medium capitalize">{data?.sport}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center ${getStatusStyle(data?.status)}`}>
                            <i className={`${getStatusIcon(data?.status)} mr-2 text-xs`}></i>
                            {data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                            <i className="fas fa-calendar-alt text-blue-500 mr-3"></i>
                            <div>
                                <span className="text-xs font-medium text-gray-500 block">Date</span>
                                <span className="text-sm font-semibold text-gray-800">
                                    {formatDate(data?.date)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                            <i className="fas fa-clock text-purple-500 mr-3"></i>
                            <div>
                                <span className="text-xs font-medium text-gray-500 block">Time</span>
                                <span className="text-sm font-semibold text-gray-800">{data?.startTime}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-white rounded-lg shadow-sm md:col-span-2">
                            <i className="fas fa-credit-card text-green-500 mr-3"></i>
                            <div>
                                <span className="text-xs font-medium text-gray-500 block">Payment Status</span>
                                <span className="text-sm font-semibold text-gray-800 capitalize">{data?.payment}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard;