import axios from "axios";


const getById = async (id) => {

    try {
        console.log(id);

        const response = await axios.get(`http://localhost:3000/api/v1/turf/${id}`)
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export default getById;