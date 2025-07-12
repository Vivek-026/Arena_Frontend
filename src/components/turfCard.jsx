import { useNavigate } from "react-router-dom";
import turfImage from "../assets/turf.jpg";

function TurfCard({ name, location, sports, img = turfImage, price, id = '1234' }) {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/turfdetails/${id}`);
  };

  return (
    <div
      className="max-w-sm w-full cursor-pointer rounded-xl overflow-hidden shadow-md bg-white border border-gray-300 hover:shadow-xl transition-transform duration-300 hover:scale-105"
      onClick={onSubmit}
    >
      <img
        src={img}
        alt="Turf"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{name.toUpperCase()}</h2>
        <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {location}</p>
        <p className="text-sm text-gray-600 mb-3"><strong>Sports:</strong> {sports}</p>

        <div className="flex items-center justify-between">
          <span className="text-green-700 font-semibold text-md">₹{price}/hour</span>
          <button
            className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from triggering
              navigate(`/turfdetails/${id}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TurfCard;
