import axios from "axios";

import apiUrl from "../config/config";
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