<template>
  <section id="about" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h1 class="mb-0">
        {{ name.first }}
        <span class="text-primary">{{ name.last }}</span>
      </h1>
      <div class="subheading mb-5">
        {{ address.town }}, {{ address.state }} {{ address.zip }} &middot;
        <a
          :href="'mailto:' + email"
        >{{ email }}</a>
      </div>
      <p class="lead mb-5" v-html="aboutText">
      </p>
      <div class="d-flex justify-content-between">
        <div class="social-icons">
          <a :href="social.url" target="_blank" rel="noopener" v-for="(social, index) in socialList" :key="index">
            <font-awesome-icon :icon="['fab', social.icon]"></font-awesome-icon>
          </a>
        </div>
        <b-button v-b-modal.modal-banalities class="btn-banalities text-md-right">Banalités</b-button>
      </div>
    </div>

    <b-modal
      :body-bg-variant="bgColor"
      :header-bg-variant="bgColor"
      :body-text-variant="textColor"
      :header-text-variant="textColor"
      id="modal-banalities"
      title="Pensées diverses"
      hide-footer
      centered
      return-focus="null"
      size="lg"
    >
      <p class="text-center" v-html="banalities[banalityIndex]"></p>
      <b-button class="mt-3" :variant="outlineColor" block @click="nextThought">Pensée suivante</b-button>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: "About",
  methods: {
    nextThought() {
      this.banalityIndex = ++this.banalityIndex % this.banalities.length;
    }
  },
  computed: {
    outlineColor() {
      return this.themeMode === "dark"
        ? "outline-secondary"
        : "outline-primary";
    },
    bgColor() {
      return this.themeMode;
    },
    textColor() {
      return this.themeMode === "dark" ? "light" : "dark";
    }
  },
  props: {
    themeMode: String,
    name: Object
  },
  data() {
    return {
      banalityIndex: 0,
      banalities: [
        "❤ Wikipedia ❤",
        "Vous cherchez une sensibilisation à la sécurité (avancée ou débutant) ? <a class='text-info' href='https://sudo.pagerduty.com/' rel='noopener' target='_blank'>PagerDuty</a> est un bon début.",
        "Carmack > Romero",
        "❤ Firefox ❤",
        "En web aussi le code compilé est plus performant que le code interprété. Il n'aura fallu qu'une vingtaine d'années pour que le Webassembly n'arrive 🎉",
        "Wozniak > Jobs",
        "❤ Microsoft ❤",
        "'toto', 'foo', 'bar', etc. sont appellées variables métasyntaxiques.",
        "C++ n'est pas un langage bas niveau.",
        "❤ ESP32 ❤",
        "Le sucre syntaxique du C# est si doux 🍭",
      ],
      address: {
        state: "France",
        town: "Lille",
        zip: "59000"
      },
      email: "eduard.francois@linux.com",
      aboutText: `Passionné d'informatique et de développement, j'ai toujours au moins un projet personnel en cours sur mon bureau pour approfondir
        mes connaissances sur une technologie ou en acquérir de nouvelles.
        <br />
        Développeur Jeu Vidéo depuis la terminal, je cherche des projets mêlant plusieurs disciplines et faisant interagir des experts
        dans plusieurs domaines comme le développement, les réseaux, la sécurité, l'UI, l'UX, les graphismes, etc.`,
      socialList: [
        {
          name: "Gitlab",
          url: "https://gitlab.com/users/psyked/projects",
          icon: "gitlab"
        },
        {
          name: "WordPress",
          url: "https://wp.psyked.fr",
          icon: "wordpress"
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/edouard-fran%C3%A7ois/",
          icon: "linkedin"
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/psyked222",
          icon: "facebook"
        }
      ]
    };
  }
};
</script>