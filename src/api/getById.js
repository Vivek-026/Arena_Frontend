import axios from "axios";
import apiUrl from "../config/config";

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