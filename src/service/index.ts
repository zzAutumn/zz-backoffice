import Vue from 'vue';
import BaseService from './services/BaseService';
import ArticleService from './services/UserService';

const service = {
  base: new BaseService(),
  article: new ArticleService(),
};

Vue.prototype.$service = service;
export default service;
