import { Loading } from 'element-ui'
import axios from 'axios'
let options = false
const http = axios.create({
    timeout:5000,

})
http.interceptors.request.use((config)=>{
    console.log('loading开始');
    Loading.service(options)
    return config
},(error)=>{
    return Promise.reject(error)
})
http.interceptors.response.use((response)=>{
    console.log('loading结束');
    Loading.service(options).close()
    return response
},(error)=>{
    return Promise.reject(error)
})

export default http