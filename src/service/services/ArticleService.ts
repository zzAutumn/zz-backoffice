import BaseService from './BaseService';

export default class ArticleService extends BaseService {
  async saveArticle(data: any) {
    const url = this.API.article.saveArticle;
    const result = await this.post(url, data);
    return result;
  }

  async getArticles(data: any) {
    const url = this.API.article.getArticleList;
    const result = await this.post(url, data);
    return result;
  }
}
