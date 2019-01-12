interface Api {
  [Propname: string]: {
    [Propname: string]: string;
  };
}

const API: Api = {
  user: {
    checkUser: '/zzautumn/v1/user/check-user',
  },
};

export default API;
