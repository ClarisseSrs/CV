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
        skills: require("@/plugins/skills/en.json"),
        interests: require("@/plugins/interests/en.json"),
        projects: require("@/plugins/projects/en.json"),
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
        skills: require("@/plugins/skills/fr.json"),
        interests: require("@/plugins/interests/fr.json"),
        projects: require("@/plugins/projects/fr.json"),
    },
};
const i18n =
    new VueI18n({
        locale: 'fr',
        fallbackLocale: 'fr',
        messages,
    });

export default i18n;