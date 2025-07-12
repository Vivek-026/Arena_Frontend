import CreateTurf from "../api/createTurf";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateTurfForm() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const id = useSelector((state) => state.auth.userData._id);

    const validateForm = () => {
        const newErrors = {};
        if (!data.name) newErrors.name = "Turf name is required";
        if (!data.location) newErrors.location = "Location is required";
        if (!data.price || isNaN(data.price)) newErrors.price = "Valid price is required";
        if (!data.sports) newErrors.sports = "At least one sport is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateTurf = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await CreateTurf({ ...data, id });
            if (response) {
                navigate('/', { state: { success: "Turf created successfully!" } });
            }
        } catch (err) {
            console.error('Error creating turf:', err);
            setErrors({ submit: "Failed to create turf. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-green-600 py-6 px-8">
                        <h1 className="text-2xl font-bold text-white">Create New Turf</h1>
                        <p className="text-green-100 mt-1">Fill in the details to list your turf</p>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleCreateTurf} className="p-8 space-y-6">
                        {/* Turf Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Turf Name *</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                placeholder="Enter turf name"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                value={data.name || ''}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                placeholder="Enter location"
                                onChange={(e) => setData({ ...data, location: e.target.value })}
                                value={data.location || ''}
                            />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹ per hour) *</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    className={`w-full pl-8 pr-4 py-3 rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                    placeholder="Enter price per hour"
                                    onChange={(e) => setData({ ...data, price: e.target.value })}
                                    value={data.price || ''}
                                    min="0"
                                />
                            </div>
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows="3"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter description (facilities, rules, etc.)"
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                value={data.description || ''}
                            />
                        </div>

                        {/* Sports */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sports *</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.sports ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                placeholder="e.g. Cricket, Football, Basketball"
                                onChange={(e) => setData({ ...data, sports: e.target.value })}
                                value={data.sports || ''}
                            />
                            <p className="mt-1 text-xs text-gray-500">Separate multiple sports with commas</p>
                            {errors.sports && <p className="mt-1 text-sm text-red-600">{errors.sports}</p>}
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="e.g. Changing rooms, Parking, Floodlights"
                                onChange={(e) => setData({ ...data, amenities: e.target.value })}
                                value={data.amenities || ''}
                            />
                            <p className="mt-1 text-xs text-gray-500">Separate multiple amenities with commas</p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            {errors.submit && (
                                <p className="mb-4 text-sm text-red-600 text-center">{errors.submit}</p>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                                    isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                } flex items-center justify-center`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : (
                                    'Create Turf'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTurfForm;
