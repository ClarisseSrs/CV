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
        <div class="d-lg-block d-flex justify-content-between">
          <div>
            <b-nav-item
              v-for="(nav, index) in $t('navigation.listNav')"
              :key="index"
              class="js-scroll-trigger"
              :href="'#'+index"
            >{{ nav }}</b-nav-item>
          </div>
            <hr class="d-lg-block d-none invisible" />
          <div>
            <b-nav-item class="float-lg-none float-right">
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
              :static="false"
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
                  :lang="lang.language"
                  squared
                >
                  <flag :iso="lang.flag" v-bind:squared="false" />
                  {{lang.name}}
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    v-if="isLanguageSelected(lang.language)"
                  ></font-awesome-icon>
                  <label v-else></label>
                </b-button>
              </div>
            </b-modal>
          </div>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { eventBus } from "@/main";

export default {
  beforeMount: function() {
    eventBus.$on("themeSelection", theme => {
      this.themeMode = theme === "dark" ? "dark" : "light";
      this.themeChange();
    });
  },
  mounted: function() {
    this.themeMode = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    this.themeChange();
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
      themeMode: "dark"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
#sideNav {
  padding: 0 !important; /* hackfix modal padding */
  .navbar-nav .nav-item .nav-link {
    font-weight: 800;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
  }
}

.dark {
  .navbar .navbar-nav .nav-link,
  .dropdown-menu .dropdown-item {
    color: $black;
  }
  .navbar .navbar-nav .nav-link.active,
  .dropdown-menu .dropdown-item.active {
    color: $white;
  }
  .navbar .navbar-nav .nav-link:hover,
  .dropdown-menu .dropdown-item:hover {
    color: $gray-700;
  }
}

.light {
  .navbar .navbar-nav .nav-link,
  .dropdown-menu .dropdown-item {
    color: $white;
  }
  .navbar .navbar-nav .nav-link.active,
  .dropdown-menu .dropdown-item.active {
    color: $secondary;
  }
  .navbar .navbar-nav .nav-link:hover,
  .dropdown-menu .dropdown-item:hover {
    color: lighten($secondary, 15%);
  }
}

@media (min-width: 992px) {
  #sideNav {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;

    width: $sidebar-base-width;
    height: 100vh;
    .navbar-brand {
      display: flex;

      margin: auto auto 0;
      padding: 0.5rem;
      .img-profile {
        max-width: 10rem;
        max-height: 10rem;
        border: 0.5rem double fade-out($white, 0.8);
      }
    }
    .navbar-collapse {
      display: flex;
      align-items: flex-start;
      flex-grow: 0;

      width: 100%;
      margin-bottom: auto;
      .navbar-nav {
        flex-direction: column;

        width: 100%;
        .nav-item {
          display: block;
          .nav-link {
            display: block;
          }
        }
      }
    }
  }
}

.dark {
  .bg-primary {
    background-color: $secondary !important;
  }
}
.light {
  .bg-primary {
    background-color: $primary !important;
  }
}
.btn-language {
  display: flex;
  justify-content: space-between;
}
</style>