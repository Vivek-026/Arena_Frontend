import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

const getById = async (id) => {

    try {
        console.log(id);

        const response = await axios.get(`${apiUrl}/api/v1/turf/${id}`)
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export default getById;