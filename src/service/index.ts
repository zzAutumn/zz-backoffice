import Vue from 'vue';
import BaseService from './services/BaseService';
import UserService from './services/UserService';

const service = {
  base: new BaseService(),
  user: new UserService(),
};
export default service;
