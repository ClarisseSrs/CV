<template>
  <section id="skills" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">{{$t('skills.skills')}}</h2>
      <div class="subheading mb-3">{{$t('skills.tools')}} &amp; {{$t('skills.languages')}}</div>
      <ul class="list-inline dev-icons">
        <li
          class="list-inline-item"
          v-for="(tools, index) in toolsList"
          :key="index"
          :title="tools.name"
        >
          <font-awesome-icon :icon="['fab', tools.icon]" v-if="tools.icon"></font-awesome-icon>
          <svg
            class="svg-inline--fa fa-w-14"
            viewBox="0 0 256 256"
            v-html="tools.rawSVG"
            v-show="tools.rawSVG"
          />
        </li>
      </ul>

      <div
        class="subheading clickable"
        v-on:click="toggleDetailProjects()"
        :aria-expanded="showDetailProjects"
        :title="$t('skills.toggleDisplay')"
      >
        <font-awesome-icon
          :icon="['fa', showDetailProjects?'minus-square':'plus-square']"
          class="text-info mr-1"
        ></font-awesome-icon>
        {{$t('skills.details')}}
      </div>
      <transition name="bounce">
        <div v-show="showDetailProjects" class="mb-1 text-justify">
          <span v-for="(tool, index) in mapToolsToReferences" :key="index">
            &#160;
            <a
              v-b-modal.modal-tool
              v-on:click="selectTool(tool[0])"
              :title="$tc('skills.reference', tool[1].length)"
            >&bull;{{tool[0]}}</a>
          </span>
        </div>
      </transition>
      <b-modal
        :body-bg-variant="bgColor"
        :header-bg-variant="bgColor"
        :body-text-variant="textColor"
        :header-text-variant="textColor"
        id="modal-tool"
        ref="modal-tool"
        :title="currentTool"
        hide-footer
        centered
        return-focus="null"
        size="lg"
      >
        <div v-show="currentTool">
          <div v-if="currentToolInfo && (currentToolInfo.wikiExtract || currentToolInfo.link)">
            <p class="font-weight-bold clickable" v-on:click="toggleInfoWiki()">
              <font-awesome-icon
                :icon="['fa', showInfoWiki?'minus-square':'plus-square']"
                class="text-info mr-1"
              ></font-awesome-icon>
              {{$t('skills.informations')}}
            </p>
            <transition name="bounce">
              <div v-show="showInfoWiki">
                <span v-show="currentToolInfo.wikiExtract">
                  {{$t('skills.wikipediaExtract')}} :
                  <blockquote
                    class="text-justify font-italic wiki-quote"
                    v-html="currentToolInfo.wikiExtract"
                    v-show="showInfoWiki"
                  ></blockquote>
                </span>
                <p
                  :class="themeMode"
                  class="text-right"
                  v-show="currentToolInfo && currentToolInfo.link"
                >
                  <a
                    :href="currentToolInfo.link"
                    target="_blank"
                    rel="noopener"
                  >{{$t('skills.about')}} {{currentTool}}</a>
                </p>
              </div>
            </transition>
          </div>
          <div v-show="mapToolsToReferences.get(currentTool)">
            <b-table
              :dark="enableDarkTheme"
              striped
              hover
              :selectable="true"
              select-mode="single"
              sticky-header
              :items="mapToolsToReferences.get(currentTool)"
              :fields="['title', 'entity']"
              sort-by="entity"
              @row-clicked="selectProject"
            >
              <template v-slot:head(title)>
                <span>{{$t('skills.title')}}</span>
              </template>
              <template v-slot:head(entity)>
                <span>{{$t('skills.entity')}}</span>
              </template>
            </b-table>
          </div>
        </div>
      </b-modal>

      <div class="subheading mb-3">{{$t('skills.methods')}}</div>
      <ul class="fa-ul">
        <li
          v-for="(workflow, index) in $t('skills.workflowList')"
          :key="index"
          class="d-flex align-items-center"
        >
          <font-awesome-icon :icon="['fas', 'check']" class="fa-li"></font-awesome-icon>
          {{ workflow }}
        </li>
      </ul>
      <div class="subheading mb-3">{{$t('skills.miscellaneous')}}</div>
      <ul class="fa-ul mb-0">
        <li
          class="d-flex align-items-center"
          v-for="(misc, index) in $t('skills.miscellaneousList')"
          :key="index"
        >
          <span class="fa-li">&bull;</span>
          {{misc}}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main";

export default {
  beforeCreate: function() {
    eventBus.$on("toolSelection", toolName => {
      this.selectTool(toolName);
    });
    eventBus.$on("toolPopUp", toolName => {
      if (!this.mapToolsToReferences.get(toolName)) {
        return;
      }
      this.selectTool(toolName);
      this.showInfoWiki = true;
      this.$refs["modal-tool"].show();
    });
    eventBus.$on("themeChange", themeMode => {
      this.themeMode = themeMode;
    });
  },
  computed: {
    enableDarkTheme: function() {
      return this.themeMode === "dark";
    },
    bgColor: function() {
      return this.themeMode;
    },
    textColor: function() {
      return this.themeMode === "dark" ? "light" : "dark";
    }
  },
  methods: {
    toggleInfoWiki: function() {
      this.showInfoWiki = !this.showInfoWiki;
    },
    selectProject: function(proj) {
      eventBus.$emit("projectSelection", proj.id);
    },
    toggleDetailProjects: function() {
      this.showDetailProjects = !this.showDetailProjects;
    },
    selectTool: function(toolName) {
      this.showInfoWiki = false;
      this.currentTool = toolName;
      this.currentToolInfo = this.$t("skills.toolsInfoMap")[toolName];
      if (!this.currentToolInfo) {
        return;
      }
      if (this.currentToolInfo.wikiExtract) {
        return;
      }
      if (!this.currentToolInfo.wikiQuery) {
        this.currentToolInfo.wikiExtract = undefined;
        return;
      }
      fetch(this.$t("skills.baseURLWiki") + this.currentToolInfo.wikiQuery)
        .then(res => res.json())
        .then(json => {
          this.currentToolInfo.wikiExtract = Object.values(
            json.query.pages
          )[0].extract;
          this.$forceUpdate();
        })
        .catch(err => {
          this.currentToolInfo.wikiExtract = this.$t("skills.errorExtractFail");
        });
    }
  },
  beforeMount: function() {
    // links each tool to every project using it
    let mapToolsToReferences = new Map();
    this.$t("projects.projectList").forEach((project, index) => {
      project.id = index;
      project.info.tools.forEach(tool => {
        if (!mapToolsToReferences.get(tool.name)) {
          mapToolsToReferences.set(tool.name, []);
        }
        mapToolsToReferences.get(tool.name).push(project);
      });
    });
    this.mapToolsToReferences = new Map(
      [...mapToolsToReferences].sort((a, b) =>
        a[1].length < b[1].length ? 1 : -1
      )
    );
  },
  data: function() {
    return {
      themeMode: "dark",
      mapToolsToReferences: new Map(),
      showInfoWiki: false,
      showDetailProjects: false,
      currentTool: "",
      currentToolInfo: {},
      toolsList: [
        {
          name: "C#",
          rawSVG: `
            <path fill="currentColor" d="
              M255.569,84.72 C255.567,79.89 254.534,75.622 252.445,71.959 C250.393,68.357 247.32,65.338 243.198,62.951 C209.173,43.332 175.115,23.773 141.101,4.134 C131.931,-1.16 123.04,-0.967 113.938,4.403 C100.395,12.39 32.59,51.237 12.385,62.94 C4.064,67.757 0.015,75.129 0.013,84.711 C0,124.166 0.013,163.62 0,203.076 C0.002,207.8 0.991,211.985 2.988,215.593 C5.041,219.304 8.157,222.406 12.374,224.847 C32.58,236.55 100.394,275.394 113.934,283.383 C123.04,288.756 131.931,288.948 141.104,283.652 C175.119,264.012 209.179,244.454 243.209,224.835 C247.426,222.395 250.542,219.291 252.595,215.583 C254.589,211.975 255.58,207.79 255.582,203.065 C255.582,203.065 255.582,124.176 255.569,84.72
              M201.892326,116.294008 L201.892326,129.767692 L215.36601,129.767692 L215.36601,116.294008 L222.102852,116.294008 L222.102852,129.767692 L235.576537,129.767692 L235.576537,136.504534 L222.102852,136.504534 L222.102852,149.978218 L235.576537,149.978218 L235.576537,156.71506 L222.102852,156.71506 L222.102852,170.188744 L215.36601,170.188744 L215.36601,156.71506 L201.892326,156.71506 L201.892326,170.188744 L195.155484,170.188744 L195.155484,156.71506 L181.6818,156.71506 L181.6818,149.978218 L195.155484,149.978218 L195.155484,136.504534 L181.6818,136.504534 L181.6818,129.767692 L195.155484,129.767692 L195.155484,116.294008 L201.892326,116.294008 Z M215.36601,136.504534 L201.892326,136.504534 L201.892326,149.978218 L215.36601,149.978218 L215.36601,136.504534
              M128.456752,48.625876 C163.600523,48.625876 194.283885,67.7121741 210.718562,96.0819435 L210.558192,95.808876 L169.209615,119.617159 C161.062959,105.823554 146.128136,96.5150717 128.996383,96.3233722 L128.456752,96.3203544 C102.331178,96.3203544 81.1506705,117.499743 81.1506705,143.625316 C81.1506705,152.168931 83.4284453,160.17752 87.3896469,167.094792 C95.543745,181.330045 110.872554,190.931398 128.456752,190.931398 C146.149522,190.931398 161.565636,181.208041 169.67832,166.820563 L169.481192,167.165876 L210.767678,191.083913 C194.51328,219.21347 164.25027,238.240861 129.514977,238.620102 L128.456752,238.625876 C93.2021701,238.625876 62.4315028,219.422052 46.0382398,190.902296 C38.0352471,176.979327 33.4561922,160.837907 33.4561922,143.625316 C33.4561922,91.1592636 75.9884604,48.625876 128.456752,48.625876
            "/>
          `
        },
        {
          name: "C++",
          rawSVG: `
            <path fill="currentColor" d="
              M255.569,84.72 C255.567,79.89 254.534,75.622 252.445,71.959 C250.393,68.357 247.32,65.338 243.198,62.951 C209.173,43.332 175.115,23.773 141.101,4.134 C131.931,-1.16 123.04,-0.967 113.938,4.403 C100.395,12.39 32.59,51.237 12.385,62.94 C4.064,67.757 0.015,75.129 0.013,84.711 C0,124.166 0.013,163.62 0,203.076 C0.002,207.8 0.991,211.985 2.988,215.593 C5.041,219.304 8.157,222.406 12.374,224.847 C32.58,236.55 100.394,275.394 113.934,283.383 C123.04,288.756 131.931,288.948 141.104,283.652 C175.119,264.012 209.179,244.454 243.209,224.835 C247.426,222.395 250.542,219.291 252.595,215.583 C254.589,211.975 255.58,207.79 255.582,203.065 C255.582,203.065 255.582,124.176 255.569,84.72
              M248.728,148.661 L239.006,148.661 L239.006,158.385 L229.282,158.385 L229.282,148.661 L219.561,148.661 L219.561,138.94 L229.282,138.94 L229.282,129.218 L239.006,129.218 L239.006,138.94 L248.728,138.94 L248.728,148.661
              M213.253,148.661 L203.532,148.661 L203.532,158.385 L193.81,158.385 L193.81,148.661 L184.088,148.661 L184.088,138.94 L193.81,138.94 L193.81,129.218 L203.532,129.218 L203.532,138.94 L213.253,138.94 L213.253,148.661
              M128.456752,48.625876 C163.600523,48.625876 194.283885,67.7121741 210.718562,96.0819435 L210.558192,95.808876 L169.209615,119.617159 C161.062959,105.823554 146.128136,96.5150717 128.996383,96.3233722 L128.456752,96.3203544 C102.331178,96.3203544 81.1506705,117.499743 81.1506705,143.625316 C81.1506705,152.168931 83.4284453,160.17752 87.3896469,167.094792 C95.543745,181.330045 110.872554,190.931398 128.456752,190.931398 C146.149522,190.931398 161.565636,181.208041 169.67832,166.820563 L169.481192,167.165876 L210.767678,191.083913 C194.51328,219.21347 164.25027,238.240861 129.514977,238.620102 L128.456752,238.625876 C93.2021701,238.625876 62.4315028,219.422052 46.0382398,190.902296 C38.0352471,176.979327 33.4561922,160.837907 33.4561922,143.625316 C33.4561922,91.1592636 75.9884604,48.625876 128.456752,48.625876
            "/>
          `
        },
        {
          name: "Java",
          icon: "java"
        },
        {
          name: "Python",
          icon: "python"
        },
        {
          name: "Typescript",
          rawSVG: `
            <mask id="tsMask">
              <rect width="100%" height="100%" fill="white"/>
              <path fill="black" d="
                  M56.611 128.85l-.081 10.483h33.32v94.68H113.42v-94.68h33.32v-10.28c0-5.69-.122-10.444-.284-10.566c-.122-.162-20.399-.244-44.983-.203l-44.739.122l-.122 10.443
                  M206.567 118.108c6.501 1.626 11.459 4.51 16.01 9.224c2.357 2.52 5.851 7.112 6.136 8.209c.08.325-11.053 7.802-17.798 11.987c-.244.163-1.22-.894-2.317-2.52c-3.291-4.794-6.745-6.867-12.028-7.232c-7.76-.529-12.759 3.535-12.718 10.32c0 1.992.284 3.17 1.097 4.796c1.707 3.535 4.876 5.648 14.832 9.955c18.326 7.884 26.168 13.085 31.045 20.48c5.445 8.25 6.664 21.415 2.966 31.208c-4.063 10.646-14.14 17.88-28.323 20.277c-4.388.772-14.79.65-19.504-.203c-10.28-1.829-20.033-6.908-26.047-13.572c-2.357-2.601-6.949-9.387-6.664-9.875c.122-.162 1.178-.812 2.356-1.503c1.138-.65 5.446-3.13 9.509-5.486l7.355-4.267l1.544 2.276c2.154 3.291 6.867 7.802 9.712 9.305c8.167 4.308 19.383 3.698 24.909-1.26c2.357-2.153 3.332-4.388 3.332-7.68c0-2.966-.366-4.266-1.91-6.5c-1.99-2.845-6.054-5.243-17.595-10.24c-13.206-5.69-18.895-9.225-24.096-14.833c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.616-1.22-12.678-.447-16.335c2.723-12.76 12.353-21.658 26.25-24.3c4.51-.853 14.994-.528 19.424.57
              "/>
            </mask>
          <rect fill="currentColor" width="100%" height="100%" mask="url(#tsMask)" />
        `
        },
        {
          name: "Vue.JS",
          icon: "vuejs"
        },
        {
          name: "Unity",
          icon: "unity"
        },
        {
          name: "Windows (servers)",
          icon: "windows"
        },
        {
          name: "Linux (Ubuntu/WSL)",
          icon: "linux"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wiki-quote {
  white-space: pre-line;
}

.dev-icons {
  font-size: 3rem;
  .list-inline-item {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
.dark .dev-icons {
  svg {
    &:hover {
      color: $secondary;
    }
  }
}
.light .dev-icons {
  svg {
    &:hover {
      color: $primary;
    }
  }
}
</style>