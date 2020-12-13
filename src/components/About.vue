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
      <div class="mb-5 lead font-weight-bold" v-html="$t('about.aboutText')"></div>
      <div class="d-flex justify-content-between">
        <div class="social-icons">
          <a
            target="_blank"
            class="mb-1"
            rel="noopener"
            v-for="(social, index) in socialList"
            :key="index"
            :href="social.url"
            :title="`${$t('about.visitMy')} ${social.name}`"
            :alt="`${$t('about.iconOf')} ${social.name}`"
          >
            <font-awesome-icon :icon="['fab', social.icon]" v-if="social.icon"></font-awesome-icon>
            <svg v-if="social.rawSVG" v-html="social.rawSVG" class="mb-1 svg-inline--fa fa-w-20" />
          </a>
        </div>
        <b-button
          v-b-modal.modal-thoughts
          :variant="btnColor"
          class="text-md-right"
        >{{$t('about.thoughts')}}</b-button>
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
      <b-button
        class="mt-3"
        :variant="btnColor"
        block
        @click="nextThought"
      >{{$t('about.nextThought')}}</b-button>
    </b-modal>
  </section>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "About",
  methods: {
    nextThought: function () {
      this.thoughtIndex =
        ++this.thoughtIndex % this.$t("about.thoughtList").length;
    },
  },
  beforeCreate: function () {
    eventBus.$on("themeChange", (themeMode) => {
      this.themeMode = themeMode;
    });
  },
  computed: {
    btnColor: function () {
      return this.themeMode === "dark" ? "secondary" : "primary";
    },
    bgColor: function () {
      return this.themeMode;
    },
    textColor: function () {
      return this.themeMode === "dark" ? "light" : "dark";
    },
  },
  data: function () {
    return {
      themeMode: "dark",
      thoughtIndex: 0,
      address: {
        state: "France",
        town: "Lille",
        zip: "59000",
      },
      email: "edouard.francois@linux.com",
      socialList: [
        {
          name: "Gitlab",
          url: "https://gitlab.com/users/psyked/projects",
          icon: "gitlab",
        },
        {
          name: "WordPress",
          url: "https://wp.psyked.fr",
          icon: "wordpress",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/edouard-fran%C3%A7ois",
          icon: "linkedin",
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/psyked222",
          icon: "facebook",
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/psyked22",
          icon: "instagram",
        },
        {
          name: "BuyMeACoffee",
          url: "https://www.buymeacoffee.com/psyked",
          rawSVG: `
            <path fill="currentColor" d="
              M9.197 0l-1.619 3.735h-2.407v3.359h0.921l0.943 5.975h-1.473l1.948 10.973 1.249-0.015 1.256 7.973h11.891l0.083-0.531 1.172-7.443 1.188 0.015 1.943-10.973h-1.407l0.937-5.975h1.011v-3.359h-2.557l-1.625-3.735z
              M9.901 1.073h12.057l1.025 2.375h-14.115z
              M6.235 4.803h19.525v1.228h-19.525z
              M6.839 14.136h18.183l-1.568 8.823-7.536-0.079-7.511 0.079z"
            />
          `,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.social-icons {
  a {
    display: inline-block;
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 100%;
    text-align: center;
    font-size: 1.5rem;
    line-height: 3.5rem;
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
}

.light .social-icons {
  a {
    background-color: $primary;
    color: $white !important;
    &:hover {
      background-color: darken($color: $primary, $amount: 15);
    }
  }
}
.dark .social-icons {
  a {
    background-color: $secondary;
    color: $dark !important;
    &:hover {
      background-color: lighten($color: $secondary, $amount: 15);
    }
  }
}
</style>