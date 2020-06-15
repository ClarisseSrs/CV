<template>
  <b-navbar toggleable="lg" type="dark" class="bg-primary fixed-top" id="sideNav">
    <b-navbar-brand to="#app">
      <span class="d-block d-lg-none">{{ $t('name.first') }} {{ $t('name.last') }}</span>
      <span class="d-none d-lg-block">
        <img
          class="img-fluid img-profile rounded-circle mx-auto mb-2"
          :src="'images/profile-' + themeMode + '.webp'"
          :alt="$t('name.first') + ' ' + $t('name.last')"
        />
      </span>
    </b-navbar-brand>

    <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>
    <b-collapse id="navbarSupportedContent" is-nav>
      <b-navbar-nav v-b-scrollspy>
        <b-nav-item
          v-for="(nav, index) in $t('navigation.listNav')"
          :key="index"
          class="js-scroll-trigger"
          :href="'#'+index"
        >{{ nav }}</b-nav-item>
        <hr />
        <b-nav-item>
          <b-button
            :variant="outlineBtn"
            v-on:click="toggleTheme()"
            :title="$t('navigation.changeTheme')"
          >
            <font-awesome-icon size="2x" :icon="[themeMode==='light'?'fas':'far', 'lightbulb']"></font-awesome-icon>
          </b-button>
        </b-nav-item>
        <b-nav-item>
          <b-button
            :variant="outlineBtn"
            v-b-modal.modal-languages
            :title="$t('navigation.language')"
          >
            <font-awesome-icon icon="language" size="2x"></font-awesome-icon>
          </b-button>
        </b-nav-item>
        <b-modal
          :body-bg-variant="bgColor"
          :header-bg-variant="bgColor"
          :body-text-variant="textColor"
          :header-text-variant="textColor"
          id="modal-languages"
          :title="$t('navigation.selectYourLanguage')"
          hide-footer
          centered
          return-focus="null"
          size="sm"
        >
          <div class="text-center">
            <b-button
              class="col-sm-12 mb-1 btn-language"
              v-for="(lang, id) in languages"
              :key="id"
              @click="changeLocale(lang.language)"
              :variant="outlineColor"
              :pressed="isLanguageSelected(lang.language)"
              squared
            >
              <flag :iso="lang.flag" v-bind:squared="false" />
              {{lang.name}}
              <font-awesome-icon :icon="['fas', 'check']" v-if="isLanguageSelected(lang.language)"></font-awesome-icon>
              <label v-else></label>
            </b-button>
          </div>
        </b-modal>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { eventBus } from "@/main";

export default {
  created: function() {
    this.themeMode = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    this.themeChange();
    eventBus.$on("themeSelection", theme => {
      this.themeMode = theme === "dark" ? "dark" : "light";
      this.themeChange();
    });
  },
  computed: {
    outlineBtn: function() {
      return this.themeMode === "dark" ? "outline-dark" : "outline-light";
    },
    outlineColor: function() {
      return this.themeMode === "dark"
        ? "outline-secondary"
        : "outline-primary";
    },
    bgColor: function() {
      return this.themeMode;
    },
    textColor: function() {
      return this.themeMode === "dark" ? "light" : "dark";
    },
    languages: function() {
      let tbr = [];
      for (let lang in this.$i18n.messages) {
        tbr.push({
          name: this.$i18n.messages[lang].lang,
          flag: this.$i18n.messages[lang].flag,
          language: lang
        });
      }
      return tbr;
    }
  },
  methods: {
    isLanguageSelected: function(lang) {
      return lang === this.$i18n.locale;
    },
    changeLocale: function(locale) {
      this.$i18n.locale = locale;
    },
    toggleTheme: function() {
      this.themeMode = this.themeMode === "light" ? "dark" : "light";
      this.themeChange();
    },
    themeChange: function() {
      eventBus.$emit("themeChange", this.themeMode);
    }
  },
  data: function() {
    return {
      themeMode: "dark",
    };
  }
};
</script>
<style scoped>
.btn-language {
  display: flex;
  justify-content: space-between;
}
</style>