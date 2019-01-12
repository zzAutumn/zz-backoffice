import BaseService from './BaseService';

export default class UserService extends BaseService {
  async checkUser(data: object) {
    const url = this.API.user.checkUser;
    const result = await this.post(url, data);
    return result;
  }
}
