import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
        lang: 'English',
        flag: 'us',
        name: {
            first: "Édouard",
            last: "François"
        },
        navigation: require("@/plugins/navigation/en.json"),
        about: require("@/plugins/about/en.json"),
        positions: require("@/plugins/positions/en.json"),
        education: require("@/plugins/education/en.json"),
        interests: require("@/plugins/interests/en.json"),
    },
    'fr': {
        lang: 'Français',
        flag: 'fr',
        name: {
            first: "Édouard",
            last: "François"
        },
        navigation: require("@/plugins/navigation/fr.json"),
        about: require("@/plugins/about/fr.json"),
        positions: require("@/plugins/positions/fr.json"),
        education: require("@/plugins/education/fr.json"),
        interests: require("@/plugins/interests/fr.json"),
    },
};
const i18n =
    new VueI18n({
        locale: 'fr', // set locale
        fallbackLocale: 'en', // set fallback locale
        messages, // set locale messages
    });

export default i18n;