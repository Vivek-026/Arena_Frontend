import React, { useEffect, useState } from 'react';
import { MapPin, Star, Wifi, Car, Shield, Coffee, Users, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import getById from '../api/getById';

function TurfDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // turf id from URL
  const [turf, setTurf] = useState(null);

  const amenityIcons = {
    "WiFi": Wifi,
    "Parking": Car,
    "Security": Shield,
    "Cafeteria": Coffee,
    "Changing Rooms": Users,
    "First Aid": Shield,
    "Washroom": Users,
    "Water": Users
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getById(id);
        setTurf(response.data.data);
      } catch (err) {
        console.error('Error fetching turf:', err);
      }
    };

    getData();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/turfdetails/booking/${id}`);
  };

  if (!turf) {
    return <div className="p-6 text-center text-gray-600">Loading turf details...</div>;
  }

  // 🛠️ Parse amenities and sports from stringified arrays
  const parseArrayField = (field) => {
    if (Array.isArray(field) && field.length > 0) {
      return field[0]
        .replace(/[\[\]"]+/g, '') // remove [ ] and quotes
        .split(',')
        .map(item => item.trim());
    }
    return [];
  };

  const amenitiesArray = parseArrayField(turf.amenities);
  const sportsArray = parseArrayField(turf.sports);

  const basePrice = Number(turf.price) || 0;
  const totalPrice = basePrice;

  return (
    <div className="min-h-screen bg-gray-100p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 p-6">

            {/* Left Side - Image and Amenities */}
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={turf.image || "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"} 
                  alt={turf.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  Premium Venue
                </div>
              </div>

              {/* Amenities Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Amenities</h3>
                <div className="space-y-2">
                  {amenitiesArray.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Users;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                        <Icon size={16} className="text-blue-600" />
                        <span className="text-sm text-gray-700">{amenity.toUpperCase()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Turf Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3"> {turf.name.toUpperCase()}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-2" />
                  <span>{turf.city.toUpperCase() || "Prime Location, City Center"}</span>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">4.8 (124 reviews)</span>
                </div>

                {/* Sports Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Sports Available</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {sportsArray.map((sport, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <div className="text-xl mb-1">⚽</div>
                        <span className="text-sm font-medium text-green-800">{sport.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">About</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {turf.description || "Premium sports facility with world-class amenities. Perfect for both casual games and competitive matches."}
                  </p>
                </div>
              </div>

              {/* Pricing and Booking */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-green-600">₹{totalPrice}</div>
                    <div className="text-gray-500 text-sm">per 2 hours</div>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Clock size={18} className="mr-1" />
                    <span className="text-sm font-medium">Available Today</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 text-sm rounded-lg transition-colors duration-200 transform hover:scale-105"
                >
                  Book Now
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Free cancellation up to 2 hours before booking time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurfDetails;
