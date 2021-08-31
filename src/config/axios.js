import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://server-notas-joaquinc77.vercel.app'
})

export default clienteAxios;