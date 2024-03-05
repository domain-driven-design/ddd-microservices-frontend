import Axios from 'axios';


export const request = Axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
