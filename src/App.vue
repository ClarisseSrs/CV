<template>
  <div id="app" :class="themeMode">
    <Navigation :name="name" :themeMode="themeMode" v-on:themeChanged="onThemeChanged" />
    <b-container class="p-0" fluid>
      <div class="bg-img-parallax bg-img-1">
        <div class="caption contrast-text">
          <About :name="name" :themeMode="themeMode" />
        </div>
      </div>

      <Border />
      <Experience />
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
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";
import Border from "@/components/Border";

export default {
  name: "app",
  mounted() {
    this.onThemeChanged(
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
    );
  },
  methods: {
    onThemeChanged(value) {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("scroller-" + this.themeMode);

      this.themeMode = value;

      document
        .getElementsByTagName("html")[0]
        .classList.add("scroller-" + this.themeMode);
    }
  },
  data() {
    return {
      themeMode: "dark",
      name: {
        first: "Édouard",
        last: "François"
      }
    };
  },
  components: {
    About,
    Experience,
    Education,
    Skills,
    Interests,
    Projects,
    Navigation,
    Border
  },
  created: function() {
    var scroll = new smoothScroll('a[href*="#"]', {
      updateURL: false
    });
  }
};
</script>

<style scoped>
.light .bg-img-1 {
  background-image: url("../public/images/img-light-1.jpg");
}
.dark .bg-img-1 {
  background-image: url("../public/images/img-dark-1.jpg");
}
.light .bg-img-2 {
  background-image: url("../public/images/img-light-2.jpg");
}
.dark .bg-img-2 {
  background-image: url("../public/images/img-dark-2.jpg");
}
.light .bg-img-3 {
  background-image: url("../public/images/img-light-3.jpg");
}
.dark .bg-img-3 {
  background-image: url("../public/images/img-dark-3.jpg");
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
