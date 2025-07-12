import axios from "axios";


const getBookingById = async (id) => {

    try {
        console.log('id',id);

        const response = await axios.get(`http://localhost:3000/api/v1/user/bookings/${id}`)
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export default getBookingById;