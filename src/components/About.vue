<template>
  <section id="about" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h1 class="mb-0">
        {{ $t('name.first') }}
        <span class="text-primary">{{ $t('name.last') }}</span>
      </h1>
      <div class="subheading mb-5">
        {{ address.town }}, {{ address.state }} {{ address.zip }} &middot;
        <a
          :href="'mailto:' + email"
        >{{ email }}</a>
      </div>
      <p class="lead mb-5" v-html="$t('about.aboutText')"></p>
      <div class="d-flex justify-content-between">
        <div class="social-icons">
          <a
            :href="social.url"
            target="_blank"
            rel="noopener"
            v-for="(social, index) in socialList"
            :key="index"
          >
            <font-awesome-icon :icon="['fab', social.icon]"></font-awesome-icon>
          </a>
        </div>
        <b-button v-b-modal.modal-thoughts :variant="btnColor" class="text-md-right">{{$t('about.thoughts')}}</b-button>
      </div>
    </div>

    <b-modal
      :body-bg-variant="bgColor"
      :header-bg-variant="bgColor"
      :body-text-variant="textColor"
      :header-text-variant="textColor"
      id="modal-thoughts"
      :title="$t('about.miscellaneousThoughts')"
      hide-footer
      centered
      return-focus="null"
      size="lg"
    >
      <p class="text-center" v-html="$t(`about.thoughtList[${thoughtIndex}]`)"></p>
      <b-button class="mt-3" :variant="btnColor" block @click="nextThought">{{$t('about.nextThought')}}</b-button>
    </b-modal>
  </section>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "About",
  methods: {
    nextThought: function() {
      this.thoughtIndex = ++this.thoughtIndex % this.$t('about.thoughtList').length;
    }
  },
  created: function() {
    eventBus.$on("themeChange", themeMode => {
      this.themeMode = themeMode;
    });
  },
  computed: {
    btnColor: function() {
      return this.themeMode === "dark" ? "warning" : "primary";
    },
    bgColor: function() {
      return this.themeMode;
    },
    textColor: function() {
      return this.themeMode === "dark" ? "light" : "dark";
    }
  },
  data: function() {
    return {
      themeMode: "dark",
      thoughtIndex: 0,
      address: {
        state: "France",
        town: "Lille",
        zip: "59000"
      },
      email: "eduard.francois@linux.com",
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
