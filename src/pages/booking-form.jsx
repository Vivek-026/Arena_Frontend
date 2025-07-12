import React, { useEffect, useState } from 'react';
import bookTurf from '../api/bookTurf';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [selectedSport, setSelectedSport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();
  const user = useSelector((state)=>state.auth.userData._id);
  const [price,setPrice] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [owner,setOwner] = useState('');

  const getTurf = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/turf/${id}`);
      const owner = response.data.data.owner._id;
      const price = response.data.data.price;
      setOwner(owner);
      setPrice(price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTurf();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedSport) {
      alert('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      if (!price) {
        throw new Error('Price not loaded yet. Please wait a moment and try again.');
      }
      const calculatedPrice = price * parseInt(selectedDuration);
      setTotalPrice(calculatedPrice);

      const startTime = selectedTime.split(' - ')[0];
      const [hours, minutes, ampm] = startTime.split(/[: ]/);
      let hour = parseInt(hours);
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      const formattedStartTime = `${hour.toString().padStart(2, '0')}:${minutes}`;

      const data = {
        turf: id,
        user: user,
        owner: owner,
        date: selectedDate,
        time: formattedStartTime,
        duration: selectedDuration,
        sport: selectedSport,
        price: calculatedPrice
      };

      const response = await bookTurf(data);
      if (response) {
        alert('Booking confirmed successfully!');
        navigate('/userprofile');
      } 
    } catch (error) {
      alert(error.message || 'An error occurred while booking');
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time slots from 6 AM to 12 AM
  const timeSlots = [];
  const startHour = 6;
  const endHour = 24;
  
  for (let hour = startHour; hour < endHour; hour++) {
    const start = hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
    const end = hour < 12 ? `${hour + 1}:00 AM` : `${hour - 11}:00 PM`;
    timeSlots.push(`${start} - ${end}`);
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 py-6 px-8">
            <h2 className="text-2xl font-bold text-white">Book Your Turf</h2>
            <p className="text-green-100 mt-1">Secure your playing time in just a few clicks</p>
          </div>
  
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Booking Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
  
            {/* Time Slot */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
  
            {/* Duration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                {[1, 2, 3, 4].map((h) => (
                  <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
  
            {/* Sport */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sport</label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select a sport</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
              </select>
            </div>
  
            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border border-green-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{price || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{selectedDuration} hour{selectedDuration > 1 ? 's' : ''}</span>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-green-600">₹{totalPrice || 0}</span>
              </div>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !selectedDate || !selectedTime || !selectedSport}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;