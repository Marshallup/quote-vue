<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Опубликовать цитату</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
              >
                <v-textarea
                    auto-grow
                    name="input-7-1"
                    label="Текст цитаты*"
                    rows="4"
                    v-model="quote_data.text"
                    :error-messages="errors.text"
                    @input="validate({ 'text':quote_data.text})"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Автор*"
                    required
                    v-model="quote_data.author"
                    :error-messages="errors.author"
                    @input="validate({ 'author':quote_data.author})"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-autocomplete
                    :items="tags"
                    label="Теги*"
                    multiple
                    counter="3"
                    v-model="quote_data.tags"
                    :error-messages="errors.tags"
                    @change="validate({ 'tags':quote_data.tags})"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*Обязательные поля</small>
        </v-card-text>
        <v-card-actions class="pb-5">
          <v-spacer></v-spacer>
          <v-btn
              color="error"
              @click="closeModal"
          >
            Закрыть
          </v-btn>
          <v-btn
              color="success"
              @click="saveQuote"
              :disabled="disabled"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  data: () => ({
    disabled: false,
    quote_data: {
      text: '',
      author: '',
      tags: '',
    },
    errors: {
      text: '',
      author: '',
      tags: '',
    },
  }),
  props: {
    callModal: {
      default: false,
    },
  },
  computed: {
    tags() {
      return this.$store.getters['tags/getTags'];
    },
    dialog() {
      return this.$store.getters.getDialog;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('modalAddQuote');
    },
    async saveQuote() {
      const dataInputs = this.quote_data;
      const resultValidate = this.validate(dataInputs);
      if (resultValidate) {
        this.disabled = true;
        const response = await this.$store.dispatch('quotes/createQuote', this.quote_data);
        if (response.success) {
          this.quote_data.author = '';
          this.quote_data.text = '';
          this.quote_data.tags = '';
        }
        if (this.$route.path === '/') {
          if (this.$route.query.page) {
            await this.$router.push('/');
          }
        } else {
          await this.$router.push('/');
        }
        this.disabled = false;
        this.closeModal();
      }
    },
    validate(data) {
      let applySendData = true;
      Object.keys(data).forEach((val) => {
        switch (data[val]) {
          case '':
            this.errors[val] = 'Обязательно для заполнения!';
            applySendData = false;
            break;
          default:
            this.errors[val] = '';
            break;
        }
        if (val === 'text' && data[val].length < 20 && data[val] !== '') {
          this.errors[val] = 'Минимальное количество символов 20!';
          applySendData = false;
        }
        if (val === 'author' && data[val].length < 3 && data[val] !== '') {
          this.errors[val] = 'Минимальное количество символов 3!';
          applySendData = false;
        }
        if (val === 'author' && data[val].length > 19 && data[val] !== '') {
          this.errors[val] = 'Максимальное количество символов 19!';
          applySendData = false;
        }
        if (val === 'tags' && (data[val].length === 0 || data[val] === '')) {
          this.errors[val] = 'Нужно выбрать хотя-бы 1 тег!';
          applySendData = false;
        }
        if (val === 'tags' && data[val].length > 3 && data[val].length !== 0) {
          this.errors[val] = 'Максимальное количество тегов 3!';
          applySendData = false;
        }
      });
      return applySendData;
    },
  },
  async beforeMount() {
    await this.$store.dispatch('tags/getTags');
  },
};
</script>

<style scoped>

</style>
