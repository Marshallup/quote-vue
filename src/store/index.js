import Vue from 'vue';
import Vuex from 'vuex';

import tags from './modules/tags';
import quotes from './modules/quotes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api_url: process.env.VUE_APP_API_URL,
    dialog: false,
    preloader: false,
  },
  getters: {
    getDialog(state) {
      return state.dialog;
    },
    getApiUrl(state) {
      return state.api_url;
    },
  },
  mutations: {
    modalAddQuote(state) {
      state.dialog = !state.dialog;
    },
    setPreloader(state, status) {
      state.preloader = status;
    },
  },
  actions: {
  },
  modules: {
    tags,
    quotes,
  },
});
