import axios from "axios";


const register = async (data) => {

    try {
        console.log(data);

        const response = await axios.post('http://localhost:3000/api/v1/signup', {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        })
        return response;

    } catch (error) {
        console.log(error);
        throw error;

    }

}
export default register;