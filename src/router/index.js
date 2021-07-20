import Vue from 'vue';
import VueRouter from 'vue-router';
import TheQuote from '../components/TheQuote.vue';
import TheQuotesList from '../components/TheQuotesList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/quote-:id',
    name: 'Quote',
    component: TheQuote,
  },
  {
    path: '/:page?',
    name: 'QuoteList',
    component: TheQuotesList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
