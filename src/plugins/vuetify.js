import Vue from "vue";
import Vuetify from "vuetify/lib";
import { preset } from "vue-cli-plugin-vuetify-preset-basil/preset";

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  theme: {
    dark: false
  },
  icons: {
    iconfont: "mdi" // default - only for display purposes
  }
});
