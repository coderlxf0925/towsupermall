import axios from "axios";


export function request(config,success,failure){
    const insttance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
    })


    insttance.interceptors.request.use(config =>{
        return config
    },err =>{
      
    })

    insttance.interceptors.response.use(res =>{
        return res.data
    },err =>{
        console.log(err);
        
    })

    // 3.发送真正的网络请求
    return insttance(config)
}
