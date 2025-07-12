import axios from "axios";
import apiUrl from "../config/config";

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