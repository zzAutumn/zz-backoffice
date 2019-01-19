interface Api {
  [Propname: string]: {
    [Propname: string]: string;
  };
}

const API: Api = {
  user: {
    checkUser: '/zzautumn/v1/user/check-user',
  },
  article: {
    saveArticle: '/zzautumn/v1/article/save-article',
    getArticleList: '/zzautumn/v1/article/getArticleList',
    deleteById: '/zzautumn/v1/article/deleteById',
    findById: '/zzautumn/v1/article/getById',
  },
};

export default API;
