<template>
  <div id="app" :class="themeMode">
    <Navigation />
    <b-container class="p-0" fluid>
      <div class="bg-img-parallax bg-img-1">
        <div class="caption contrast-text">
          <About />
        </div>
      </div>
      <Border />
      <Positions />
      <Border />
      <div class="bg-img-parallax bg-img-2">
        <div class="caption contrast-text">
          <Education />
        </div>
      </div>
      <Border />
      <Skills />
      <Border />
      <div class="bg-img-parallax bg-img-3">
        <div class="caption contrast-text">
          <Interests />
        </div>
      </div>
      <Border />
      <Projects />
    </b-container>
  </div>
</template>

<script>
import smoothScroll from "smooth-scroll";

import About from "@/components/About";
import Positions from "@/components/Positions";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";
import Border from "@/components/Border";

import { eventBus } from "@/main";

export default {
  name: "app",
  methods: {
    onThemeChanged: function(value) {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("scroller-" + this.themeMode);

      this.themeMode = value;

      document
        .getElementsByTagName("html")[0]
        .classList.add("scroller-" + this.themeMode);
    }
  },
  data: function() {
    return {
      themeMode: "dark",
    };
  },
  components: {
    About,
    Positions,
    Education,
    Skills,
    Interests,
    Projects,
    Navigation,
    Border
  },
  mounted: function() {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    let projectId = params.get("projectId");
    let tool = params.get("toolName");
    let theme = params.get("theme");
    let lang = params.get("lang");

    if(lang && this.$i18n.messages[lang]) {
      this.$i18n.locale = lang;
    }
    if (theme) {
      eventBus.$emit("themeSelection", theme);
    }
    if (projectId) {
      eventBus.$emit("projectSelection", Number(projectId));
    }
    if (tool) {
      eventBus.$emit("toolPopUp", tool);
    }
  },
  beforeCreate: function() {
    eventBus.$on("themeChange", themeMode => {
      this.onThemeChanged(themeMode);
    });
    var scroll = new smoothScroll('a[href*="#"]', {
      updateURL: true
    });
  }
};
</script>

<style scoped>
.light .bg-img-1 {
  background-image: url("../public/images/img-light-1.webp");
}
.dark .bg-img-1 {
  background-image: url("../public/images/img-dark-1.webp");
}
.light .bg-img-2 {
  background-image: url("../public/images/img-light-2.webp");
}
.dark .bg-img-2 {
  background-image: url("../public/images/img-dark-2.webp");
}
.light .bg-img-3 {
  background-image: url("../public/images/img-light-3.webp");
}
.dark .bg-img-3 {
  background-image: url("../public/images/img-dark-3.webp");
}

.bg-img-parallax {
  position: relative;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.light .caption {
  background-color: rgba(255, 255, 255, 0.7);
}
.dark .caption {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
