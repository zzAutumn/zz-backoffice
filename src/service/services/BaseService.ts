import axios from '../axios';
import API from '../api';

export default class BaseService {
  public API: any;

  constructor() {
    this.API = API;
  }

  async post(url: string, data = {}) {
    const result = await axios.post(url, data);
    return result.data;
  }
}
