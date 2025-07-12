import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

const getTurf = async () => {

    try {
       

        const response = await axios.get(`${apiUrl}/api/v1/turf`)
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export default getTurf;