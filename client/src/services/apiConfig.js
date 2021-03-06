import axios from 'axios'

const getToken = () => {
  return new Promise(resolve => {
    resolve(`Bearer ${localStorage.getItem('token') || null}`)
  })
}

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://tether-database.herokuapp.com/api'
    : 'https://tether-database.herokuapp.com/api'
})

api.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = await getToken()
  return config
}, (error) => {
  console.log('Request error: ', error)
  return Promise.reject(error)
})

export default api