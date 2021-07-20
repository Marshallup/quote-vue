<template>
  <p v-if="quote && quote.status === 404"
     class="text-h3 error--text text-center mt-5">
    Цитата не найдена!
  </p>
  <v-row
      v-else-if="quote"
      dense
      justify="start"
      align="start"
      wrap="wrap"
      class="justify-center"
  >
    <v-col
        cols="12" sm="6" lg="4"
        class="mt-2 mb-2"
    >
      <v-card
          color="#26c6da"
          class="d-flex justify-center flex-column align-center"
      >

        <v-card-text class="headline white--text font-weight-bold">
          " {{ quote.text }} "
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

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    quote() {
      return this.$store.getters['quotes/getQuote'];
    },
  },
  async mounted() {
    await this.$store.dispatch('quotes/getQuote', this.$route.params.id);
  },
};
</script>

<style scoped>
  .flex > span:first-child {
    margin-left: 0 !important;
  }
</style>
