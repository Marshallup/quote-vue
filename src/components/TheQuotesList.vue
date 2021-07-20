<template>
  <v-container
      v-if="quotes"
  >
    <v-row
        dense
        justify="start"
        align="start"
        wrap="wrap"
    >
      <v-col
          cols="12" sm="6" mb="4" xl="3" lg="3"
          v-for="quote in quotes.data"
          :key="quote.id"
      >
        <v-card
          color="#26c6da"
        >

          <v-card-text class="headline white--text font-weight-bold">
            "{{ quote.text | maxLengthText }}"
          </v-card-text>

          <v-card-text class="pt-0 pb-0">
            <p class="text--primary mb-1">
              Автор:
            </p>
            <p class="text-h6 text--primary mb-0">
              {{ quote.author }}
            </p>
          </v-card-text>

          <v-card-text v-if="quote.tags.length" class="pb-0">
            <p class="text--primary mb-1">
              Теги:
            </p>
              <v-flex>
                <v-chip
                    v-for="tag in quote.tags"
                    :key="tag.id"
                    class="ma-2"
                >
                  {{ tag.title }}
                </v-chip>
              </v-flex>
          </v-card-text>

          <v-card-text>
            <p class="text--primary text-date">
              Дата создания - <span>{{ quote.created_at | covertTimestampToDate }}</span>
            </p>
          </v-card-text>

          <v-card-actions>
            <v-layout>
              <v-flex
                  class="text-center"
                  justify-center
              >
                <router-link
                  :to="{name: 'Quote', params: { 'id': quote.id }}"
                  class="link-btn"
                >
                  <v-btn
                      class="ma-2"
                      color="success"
                      @click="loader = 'loading'"
                  >
                    Смотреть цитату
                    <template v-slot:loader>
                      <span>Loading...</span>
                    </template>
                  </v-btn>
                </router-link>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="lengthPage > 1" class="pagination-wrap text-center">
      <v-pagination
          v-model="page"
          :length="lengthPage"
          :total-visible="5"
          @input="paginate"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loader: null,
    loading: false,
    page: null,
  }),
  computed: {
    quotes() {
      return this.$store.getters['quotes/getQuotes'];
    },
    lengthPage() {
      return this.$store.getters['quotes/getQuotes'].last_page;
    },
    currentPage() {
      return this.$route.query.page;
    },
  },
  filters: {
    maxLengthText(text) {
      const length = 85;
      if (text.length > length) {
        return `${text.slice(0, length)}...`;
      }
      return text;
    },
  },
  methods: {
    async paginate(pageNumber) {
      if (this.$route.query.page && Number(this.$route.query.page) === pageNumber) {
        return;
      }
      await this.$router.push({ query: { page: pageNumber } });
      await this.$store.dispatch('quotes/getQuotes', pageNumber);
    },
    getQuotes() {
      this.$store.dispatch('quotes/getQuotes');
      if (this.currentPage) {
        this.page = Number(this.currentPage);
      } else {
        this.page = 1;
      }
    },
  },
  watch: {
    async $route(to) {
      if (!to.query.page) {
        this.$store.commit('quotes/setCurrentPage', null);
        await this.getQuotes();
      }
    },
  },
  async mounted() {
    await this.getQuotes();
  },
};
</script>

<style lang="scss" scoped>
  .pagination-wrap {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -100%);
    margin-top: 30px;
  }
  .flex > span:first-child {
    margin-left: 0 !important;
  }
  .text-date {
    font-size: 17px;
    span {
      text-decoration: underline;
    }
  }
  .link-btn {
    text-decoration: none;
  }
</style>
