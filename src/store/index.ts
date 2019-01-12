import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  token: string;
}

const rootState: State = {
  token: 'kkk',
};

const mutations: any = {
  setToken(state: State, token: string) {
    state.token = token;
  },
};

const store = {
  state: rootState,
  mutations,
};

export default new Vuex.Store(store);
