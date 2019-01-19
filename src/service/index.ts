import Vue from 'vue';
import BaseService from './services/BaseService';
import UserService from './services/UserService';
import ArticleService from './services/ArticleService';

const service = {
  base: new BaseService(),
  user: new UserService(),
  article: new ArticleService(),
};
export default service;
