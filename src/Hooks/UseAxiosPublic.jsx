import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://matrimony-server-mu.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;