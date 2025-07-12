import axios from "axios";


const login=async(data)=>{

    try {
        
        const response = await axios.post('http://localhost:3000/api/v1/signin',{
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