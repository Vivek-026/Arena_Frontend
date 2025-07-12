import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const login=async(data)=>{

    try {
        const response = await axios.post(`${apiUrl}/api/v1/signin`,{
      email: data.email,
      password: data.password
    })
    return response;
        
    } catch (error) {
        console.log(error);
         throw error;
        
    }

}
export default login