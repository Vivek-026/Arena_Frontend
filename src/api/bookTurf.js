import axios from "axios";
import apiUrl from "../config/config";

const bookTurf = async (data) => {

    try {

        const response = await axios.post(`${apiUrl}/api/v1/bookings`, {
            turf:data.turf,
            user:data.user,
            owner:data.owner,
            date:data.date,
            startTime:data.time,
            duration:data.duration,
            sport:data.sport,
            price:data.price
        })
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}
export default bookTurf;