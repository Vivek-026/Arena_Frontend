import axios from "axios";
import apiUrl from "../config/config";

const register = async (data) => {

    try {
        console.log(data);

        const response = await axios.post(`${apiUrl}/api/v1/signup`, {
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