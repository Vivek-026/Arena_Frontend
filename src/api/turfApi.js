import axios from "axios";
import apiUrl from "../config/config";

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