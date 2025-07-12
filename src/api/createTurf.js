import axios from "axios";


const CreateTurf = async (data) => {

    try {
        console.log(data);

        const response = await axios.post('http://localhost:3000/api/v1/turf', {
            name: data.name,
            city: data.location,
            price: data.price,
            description: data.description,
            sports: data.sports,
            amenities: data.amenities,
            owner: data.id
        })
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}
export default CreateTurf;