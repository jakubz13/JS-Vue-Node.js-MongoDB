import axios from "axios";
const baseURL = "/api/movies";


export default {
    all(params){
        return axios.get(`${baseURL}/`,{
            params:{
                ...params
            }
        });
    }
}