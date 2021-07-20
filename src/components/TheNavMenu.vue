<template>
  <div>
    <v-app-bar
        app
        color="indigo"
        dark
    >
      <v-toolbar-title>
        <router-link
          :to="{ name: 'QuoteList'}"
        >
          Цитаты
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="openModal">
        Опубликовать цитату
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    openModal() {
      this.$store.commit('modalAddQuote');
    },
    createTag() {
      this.$store.dispatch('tags/createTag');
    },
  },
};
</script>

<style scoped>
  .v-toolbar__title a {
    color: white;
    text-decoration: none;
  }
  @media screen and (max-width: 360px) {
    .v-btn {
      font-size: 12px;
    }
  }
</style>
