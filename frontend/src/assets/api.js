import axios from 'axios'
import Cookies from 'universal-cookie'
export const apiInstance = ()=>{
    const cookie = new Cookies();
    const token = cookie.get('access_token')  
    
    const instance = axios.create({
        withCredentials:true,
        baseURL: 'http://localhost:3000/',
        headers:{
            Authorization: 'Bearer ' + token
        }
    })

    return instance
} 

