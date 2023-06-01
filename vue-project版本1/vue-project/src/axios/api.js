// 对请求接口进行封装

// 引入封装好的axios实例
// import { pa } from 'element-plus/es/locale/index.js';
import requests from './axios.js';


let getUser = (params={})=>{
  return requests.post('/getUser',params)
};
let getData = (params={})=>{
  return requests.get('users',params)
};
let getStudent = (params={})=>{
  return requests.get('/',params)
};
let getClass = (params={})=>{
  return requests.get('/class',params)
};
let remStudent = (params={})=>{
  return requests.post('/remstudent',params)
};
let remTeacher = (params={})=>{
  return requests.post('/remteacher',params)
};
let updateStudent = (params={})=>{
  return requests.post('/updatestudent',params)
};
let updateTeacher = (params={})=>{
  return requests.post('/updateteacher',params)
};
let updateClass = (params={})=>{
  return requests.post('/updateclass',params)
};
let verify=(params={})=>{
  return requests.post('verify',params)
}
export default {getUser,getData,getStudent,getClass,remStudent,remTeacher,updateStudent,updateTeacher,updateClass,verify}
