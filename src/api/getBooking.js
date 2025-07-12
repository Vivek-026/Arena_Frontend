import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

const getBookingById = async (id) => {

    try {
        console.log('id',id);

        const response = await axios.get(`${apiUrl}/api/v1/user/bookings/${id}`)
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export default getBookingById;