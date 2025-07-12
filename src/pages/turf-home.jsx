import { useEffect, useState } from "react";
import TurfCard from "../components/turfCard";
import getTurf from "../api/turfApi";

function Turf() {
    const [turf, setTurf] = useState([]);
    const [filteredTurf, setFilteredTurf] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getData = async () => {
        const response = await getTurf();
        setTurf(response.data.data);
        setFilteredTurf(response.data.data);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        
        if (value === "") {
            setFilteredTurf(turf);
        } else {
            const filtered = turf.filter(
                (item) =>
                    item.city.toLowerCase().includes(value) 
            );
            setFilteredTurf(filtered);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Turf</h1>
                <p className="text-gray-600">Discover and book amazing sports venues</p>
            </div>
            
            {/* Search Section */}
            <div className="text-center mb-8">
                <div className="relative inline-block w-full max-w-md">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Enter City"
                        className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors shadow-sm text-lg"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                
                {/* Results Counter */}
                {searchTerm && (
                    <p className="text-gray-600 mt-2">
                        Found <span className="font-semibold text-blue-600">{filteredTurf.length}</span> results for "{searchTerm}"
                    </p>
                )}
            </div>

            {/* Turf Grid */}
            <div className="max-w-7xl mx-auto px-4">
                {filteredTurf.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {filteredTurf.map((turfItem) => (
                            <TurfCard
                                key={turfItem._id}
                                name={turfItem.name}
                                location={turfItem.city}
                                amenities={turfItem.amenities}
                                id={turfItem._id}
                                price={turfItem.price}
                                sports={turfItem.sports}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="mb-4">
                            <svg className="w-20 h-20 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No turfs found</h3>
                        <p className="text-gray-600">
                            {searchTerm 
                                ? `No turfs match your search "${searchTerm}". Try a different city or turf name.`
                                : "No turfs available at the moment."
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default Turf;