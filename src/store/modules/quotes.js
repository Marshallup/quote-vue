import axios from 'axios';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    quote: null,
    quotes: null,
    currentPage: null,
  },
  getters: {
    getQuotes(state) {
      return state.quotes;
    },
    getQuote(state) {
      return state.quote;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
  mutations: {
    setQuotes(state, data) {
      state.quotes = data;
    },
    setQuote(state, data) {
      state.quote = data;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    async createQuote({ rootGetters, dispatch, commit }, data) {
      commit('setPreloader', true, { root: true });
      const response = await axios.post(`${rootGetters.getApiUrl}quotes/create`, data)
        .then((res) => {
          dispatch('getQuotes');
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          return error;
        });
      return response;
    },
    async getQuote({ commit, rootGetters }, id) {
      commit('setPreloader', true, { root: true });
      commit('setQuote', null);
      const apiUrl = `${rootGetters.getApiUrl}quotes/${id}`;
      await axios.get(apiUrl)
        .then((res) => {
          commit('setQuote', res.data);
          return res;
        })
        .catch((error) => {
          commit('setQuote', error.response);
          return error.response;
        });
      commit('setPreloader', false, { root: true });
    },
    async getQuotes(
      {
        commit,
        getters,
        dispatch,
        rootGetters,
      },
    ) {
      commit('setQuotes', null);
      commit('setPreloader', true, { root: true });
      dispatch('checkAndSetCurrentPage');
      let apiUrl = `${rootGetters.getApiUrl}quotes`;
      const currentPage = getters.getCurrentPage;
      if (currentPage) {
        apiUrl = `${rootGetters.getApiUrl}quotes?page=${currentPage}`;
      }
      const response = await axios.get(apiUrl)
        .then((res) => {
          const dataQuotes = res.data;
          commit('setQuotes', dataQuotes);
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          return error;
        });
      commit('setPreloader', false, { root: true });
      return response;
    },
    async checkAndSetCurrentPage({ commit }) {
      const urlPage = router.currentRoute.query.page;
      if (urlPage) {
        commit('setCurrentPage', urlPage);
      }
    },
  },
};
