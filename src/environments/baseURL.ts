import axios from 'axios'


const baseURL = axios.create({
    // baseURL: 'https://astroserver-8sv2.onrender.com'
    baseURL: 'http://localhost:3001'
})

export default baseURL