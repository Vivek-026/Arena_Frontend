import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

const getOwnerBookings=async(id)=>{

    try {
        const response=await axios.get(`${apiUrl}/api/v1/owner/bookings/${id}`)
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default getOwnerBookings;