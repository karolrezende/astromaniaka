import axios from 'axios'


const baseURL = axios.create({
    baseURL: 'https://astroserver-8sv2.onrender.com'
})

export default baseURL