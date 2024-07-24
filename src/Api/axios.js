import axios from "axios";

const axiosInstance = axios.create({
  //local instance firebase functions

  // baseURL:"http://127.0.0.1:5001/clone-fe3e9/us-central1/api"

  //deployed version of firebase function
//   baseURL: "https://api-p7bvfdjjnq-uc.a.run.app",

  //deployed version of amazon server on render.com function
  baseURL: "https://amazon-api-deploy-vve5.onrender.com/",
});



export {axiosInstance};
