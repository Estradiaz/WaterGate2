import Vue from 'vue';
//@ts-ignore
import Vuetify from 'vuetify/lib';
//@ts-ignore
import de from 'vuetify/src/locale/de';
import '@fortawesome/fontawesome-free/css/all.css'
Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { de },
      current: 'de',
    },
  icons: {
    iconfont: 'fa',
  },
});
