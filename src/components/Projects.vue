<template>
  <section id="projects" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">Projets</h2>
      <div
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-2"
        v-for="(project, index) in projectList"
        :key="index"
      >
        <div
          class="resume-content"
          :id="'project-div-'+index"
          style="cursor:pointer"
          v-on:click="showProject(project)"
        >
          <h3 class="mb-0">{{ project.title }}</h3>
          <div class="ml-3">
            <div class="subheading mb-0">
              <font-awesome-icon
                :icon="['fa', project.info.show?'minus-square':'plus-square']"
                class="text-info"
              ></font-awesome-icon>
              <span>
                {{ project.function }}
                <b>@</b>
                <strong class="text-danger">{{ project.entity }}</strong>
              </span>
            </div>

            <div class="text-left" v-show="project.info.show">
              <a :href="project.info.url" target="_blank"
              rel="noopener" v-if="project.info.url">
                Lien vers le projet
                <br />
              </a>
              <div class="contrast-text text-justify font-weight-bold">{{ project.info.description }}</div>
              <div v-if="project.info.tools" class="mb-1 text-justify font-italic">
                <span
                  v-for="(tool, index) in project.info.tools"
                  :key="index"
                >&bull;{{tool.name}}&#160;</span>
              </div>
            </div>
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
export default {
  name: "Projects",
  props: {
    projectList: Array
  },
  methods: {
    showProject(proj) {
      proj.info.show = !proj.info.show;
      proj.info.showText = proj.info.show ? "moins" : "plus";
      this.$forceUpdate();
    }
  }
};
</script>