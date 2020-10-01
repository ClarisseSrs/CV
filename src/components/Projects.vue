<template>
  <section id="projects" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">{{$t('projects.projects')}}</h2>
      <div
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-2"
        v-for="(project, index) in $t('projects.projectList')"
        :key="index"
        :class="highlightProjects.get(index)? 'highlight': ''"
      >
        <div class="resume-content">
          <h4
            class="mb-0 clickable"
            :aria-expanded="openProjects.get(index)"
            v-on:click="showProject(index)"
            :title="$t('projects.toggleDisplay')"
          >{{ project.title }}</h4>
          <div class="ml-3">
            <h5
              class="subheading mb-0 clickable"
              :aria-expanded="openProjects.get(index)"
              :id="'project-div-'+index"
              v-on:click="showProject(index)"
            >
              <font-awesome-icon
                :icon="['fa', openProjects.get(index)?'minus-square':'plus-square']"
                class="text-info"
              ></font-awesome-icon>
              <span>
                {{ project.function }}
                <b>@</b>
                <strong class="text-entity">{{ project.entity }}</strong>
              </span>
            </h5>
            <transition name="bounce">
              <div class="text-left" v-show="openProjects.get(index)">
                <a
                  :href="project.info.url"
                  target="_blank"
                  rel="noopener"
                  v-show="project.info.url"
                >
                  {{$t('projects.linkToProject')}}
                  <br />
                </a>
                <p class="contrast-text text-justify mb-1 mt-1">{{ project.info.description }}</p>
                <div v-show="project.info.tools" class="mb-1 text-justify font-italic">
                  <span
                    class="toolLink"
                    v-for="(tool, index) in project.info.tools" :key="index">
                    &#160;
                    <a
                      v-b-modal.modal-tool
                      v-on:click="selectTool(tool.name)"
                      :title="$t('projects.seeDetails')"
                    >&bull;{{tool.name}}</a>
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="resume-date text-md-right">
          <span
            class="text-primary"
            v-for="(date, index) in project.dates"
            :key="index"
          >{{ date.start }} - {{ date.end }}&#160;</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main";

export default {
  beforeCreate: function() {
    eventBus.$on("projectSelection", indexProj => {
      if (
        indexProj >= this.$t("projects.projectList").length ||
        indexProj < 0
      ) {
        return;
      }
      this.showProject(indexProj, true);
      let id = "project-div-" + indexProj;
      document.getElementById(id).scrollIntoView();
    });
  },
  methods: {
    showProject: function(index, highlight = false) {
      this.highlightProjects.clear();
      if (highlight) {
        this.openProjects.clear();
        this.highlightProjects.set(index, true);
      }
      this.openProjects.set(index, !this.openProjects.get(index));
      this.$forceUpdate();
    },
    selectTool: function(toolName) {
      eventBus.$emit("toolSelection", toolName);
    }
  },
  data: function() {
    return {
      openProjects: new Map(),
      highlightProjects: new Map()
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.highlight {
  background-color: rgba(255, 255, 0, 0.35);
}

.dark .text-entity {
  color: $secondary;
}
.light .text-entity {
  color: $primary;
}
</style>