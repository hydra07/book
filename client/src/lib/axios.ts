import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    // "Authorization": `Bearer ${token}`
  },
});

function axiosWithAuth(token: string) {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export { axiosWithAuth };
