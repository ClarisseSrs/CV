<template>
  <b-navbar toggleable="lg" type="dark" class="bg-primary fixed-top" id="sideNav">
    <b-navbar-brand to="#app">
      <span class="d-block d-lg-none">{{ name.first }} {{ name.last }}</span>
      <span class="d-none d-lg-block">
        <img
          class="img-fluid img-profile rounded-circle mx-auto mb-2"
          :src="'images/profile-' + themeMode + '.jpg'"
          :alt="name.first + ' ' + name.last"
        />
      </span>
    </b-navbar-brand>

    <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>
    <b-collapse id="navbarSupportedContent" is-nav>
      <b-navbar-nav v-b-scrollspy>
        <b-nav-item
          v-for="(navigation, index) in navigationList"
          :key="index"
          class="js-scroll-trigger"
          :href="navigation.url"
        >{{ navigation.title }}</b-nav-item>
        <b-nav-item>
          <button :class="'sticky-bottom btn btn-'+themeMode" v-on:click="toggleTheme()" right>
            <font-awesome-icon :icon="['far', themeMode==='light'?'sun':'moon']" title="theme"></font-awesome-icon>
          </button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    name: Object,
    themeMode: String
  },
  methods: {
    toggleTheme: function() {
      this.$emit("themeChanged", this.themeMode === "light" ? "dark" : "light");
    }
  },
  data() {
    return {
      navigationList: [
        {
          title: "à propos",
          url: "#about"
        },
        {
          title: "postes",
          url: "#experience"
        },
        {
          title: "diplômes",
          url: "#education"
        },
        {
          title: "compétences",
          url: "#skills"
        },
        {
          title: "intérêts",
          url: "#interests"
        },
        {
          title: "projets",
          url: "#awards"
        }
      ]
    };
  }
};
</script>