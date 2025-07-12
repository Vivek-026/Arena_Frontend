import axios from "axios";


const getTurf = async () => {

    try {
       

        const response = await axios.get('http://localhost:3000/api/v1/turf')
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export default getTurf;