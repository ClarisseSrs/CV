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
          <h3 class="mb-0 clickable" v-on:click="showProject(index)">{{ project.title }}</h3>
          <div class="ml-3">
            <div
              class="subheading mb-0 clickable"
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
                <strong class="text-danger">{{ project.entity }}</strong>
              </span>
            </div>
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
                <div class="contrast-text text-justify">{{ project.info.description }}</div>
                <div v-show="project.info.tools" class="mb-1 text-justify font-italic">
                  <span v-for="(tool, index) in project.info.tools" :key="index">
                    &#160;
                    <a
                      v-b-modal.modal-tool
                      v-on:click="selectTool(tool.name)"
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
      highlightProjects: new Map(),
    };
  }
};
</script>

<style scoped>
.highlight {
  background-color: rgba(255, 255, 0, 0.35);
}
</style>