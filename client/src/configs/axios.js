import axios from 'axios';
import env from '../utils/validateEnv';

const axiosInstance = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const instance = axios.create({
    baseURL: env.VITE_API,
    headers: headers,
  });
  return instance;
};
const axiosInstanceNoAuth = () => {
  const instance = axios.create({
    baseURL: env.VITE_API,
  });
  return instance;
};
export { axiosInstanceNoAuth };
export default axiosInstance;
