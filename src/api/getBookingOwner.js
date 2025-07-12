import axios from "axios";
import apiUrl from "../config/config";

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