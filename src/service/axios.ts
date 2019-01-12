import axios from 'axios';
import qs from 'qs';

const transformRequest = (data: any) => qs.stringify(data, { indices: false });

const instance = axios.create({
  transformRequest: [transformRequest],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default instance;
