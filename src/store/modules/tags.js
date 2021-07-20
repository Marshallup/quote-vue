import axios from 'axios';

export default {
  namespaced: true,
  state: {
    tags: null,
  },
  getters: {
    getTags(state) {
      return state.tags;
    },
  },
  mutations: {
    setTags(state, data) {
      state.tags = data;
    },
  },
  actions: {
    async getTags({ commit, rootState }) {
      const response = await axios.get(`${rootState.api_url}tags`)
        .then((res) => {
          const dataTags = res.data;
          const newTagsArr = [];
          if (dataTags) {
            dataTags.forEach((item) => {
              newTagsArr.push({
                text: item.title,
                value: item.id,
              });
            });
          }
          commit('setTags', newTagsArr);
          return res.data;
        })
        .catch((error) => {
          console.log(error, 'error');
          return error;
        });
      return response;
    },
  },
};
