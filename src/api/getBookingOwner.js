import axios from "axios";

const getOwnerBookings=async(id)=>{

    try {
        const response=await axios.get(`http://localhost:3000/api/v1/owner/bookings/${id}`)
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default getOwnerBookings;