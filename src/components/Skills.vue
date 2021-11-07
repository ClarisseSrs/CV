<template>
  <section
    id="skills"
    class="resume-section p-3 p-lg-5 d-flex align-items-center"
  >
    <div class="w-100">
      <h2 class="mb-5">{{ $t("skills.skills") }}</h2>
      <div class="subheading mb-3">
        {{ $t("skills.tools") }} &amp; {{ $t("skills.languages") }}
      </div>
      <ul class="list-inline dev-icons">
        <li
          class="list-inline-item"
          v-for="(tool, index) in toolsList"
          :key="index"
          :title="tool.title"
          v-on:click="selectTool(tool.name, tool.aliases)"
          v-b-modal.modal-tool
        >
          <font-awesome-icon
            :icon="['fab', tool.icon]"
            v-if="tool.icon"
          ></font-awesome-icon>
          <svg
            class="svg-inline--fa fa-w-14"
            viewBox="0 0 256 256"
            v-html="tool.rawSVG"
            v-show="tool.rawSVG"
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
          :icon="['fa', showDetailProjects ? 'minus-square' : 'plus-square']"
          class="text-info mr-1"
        ></font-awesome-icon>
        <label>
          {{ $t("skills.details") }}
        </label>
        <span v-show="showDetailProjects">
          ({{ $t("skills.clickOnLinkToSeeDetails") }})
        </span>
      </div>
      <transition name="bounce">
        <div v-show="showDetailProjects" class="mb-1 text-justify">
          <span
            class="toolLink"
            v-for="(tool, index) in mapToolsToReferences"
            :key="index"
          >
            &#160;
            <a
              v-b-modal.modal-tool
              v-on:click="selectTool(tool[0])"
              :title="$tc('skills.reference', tool[1].length)"
              >&bull;{{ tool[0] }}</a
            >
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
          <div
            v-if="
              currentToolInfo &&
              (currentToolInfo.wikiExtract || currentToolInfo.link)
            "
          >
            <p class="font-weight-bold clickable" v-on:click="toggleInfoWiki()">
              <font-awesome-icon
                :icon="['fa', showInfoWiki ? 'minus-square' : 'plus-square']"
                class="text-info mr-1"
              ></font-awesome-icon>
              {{ $t("skills.informations") }}
            </p>
            <transition name="bounce">
              <div v-show="showInfoWiki">
                <span v-show="currentToolInfo.wikiExtract">
                  {{ $t("skills.wikipediaExtract") }} :
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
                  <a :href="currentToolInfo.link" target="_blank" rel="noopener"
                    >{{ $t("skills.about") }} {{ currentTool }}</a
                  >
                </p>
              </div>
            </transition>
          </div>
          <div v-show="getReferencesCurrentTool()">
            <b-table
              :dark="enableDarkTheme"
              striped
              hover
              :selectable="true"
              select-mode="single"
              sticky-header
              :items="getReferencesCurrentTool()"
              :fields="['title', 'entity']"
              sort-by="entity"
              @row-clicked="selectProject"
            >
              <template v-slot:head(title)>
                <span>{{ $t("skills.title") }}</span>
              </template>
              <template v-slot:head(entity)>
                <span>{{ $t("skills.entity") }}</span>
              </template>
            </b-table>
          </div>
        </div>
      </b-modal>

      <div class="subheading mb-3">{{ $t("skills.methods") }}</div>
      <ul class="fa-ul">
        <li
          v-for="(workflow, index) in $t('skills.workflowList')"
          :key="index"
          class="d-flex align-items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'check']"
            class="fa-li"
          ></font-awesome-icon>
          {{ workflow }}
        </li>
      </ul>
      <div class="subheading mb-3">{{ $t("skills.miscellaneous") }}</div>
      <ul class="fa-ul mb-0">
        <li
          class="d-flex align-items-center"
          v-for="(misc, index) in $t('skills.miscellaneousList')"
          :key="index"
        >
          <span class="fa-li">&bull;</span>
          {{ misc }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { eventBus } from "@/main";

export default {
  beforeCreate: function () {
    eventBus.$on("toolSelection", (toolName) => {
      this.selectTool(toolName);
    });
    eventBus.$on("toolPopUp", (toolName) => {
      if (!this.mapToolsToReferences.get(toolName)) {
        return;
      }
      this.selectTool(toolName);
      this.showInfoWiki = true;
      this.$refs["modal-tool"].show();
    });
    eventBus.$on("themeChange", (themeMode) => {
      this.themeMode = themeMode;
    });
  },
  computed: {
    enableDarkTheme: function () {
      return this.themeMode === "dark";
    },
    bgColor: function () {
      return this.themeMode;
    },
    textColor: function () {
      return this.themeMode === "dark" ? "light" : "dark";
    },
  },
  methods: {
    getReferencesCurrentTool: function () {
      let refs = this.mapToolsToReferences.get(this.currentTool);
      if (refs && this.currentAliases) {
        this.currentAliases.forEach((alias) => {
          let refAlias = this.mapToolsToReferences.get(alias);
          if (refAlias) {
            refs = refs.concat(refAlias);
          }
        });
      }
      return refs;
    },
    toggleInfoWiki: function () {
      this.showInfoWiki = !this.showInfoWiki;
    },
    selectProject: function (proj) {
      eventBus.$emit("projectSelection", proj.id);
    },
    toggleDetailProjects: function () {
      this.showDetailProjects = !this.showDetailProjects;
    },
    selectTool: function (toolName, aliases) {
      this.showInfoWiki = false;
      this.currentTool = toolName;
      this.currentAliases = aliases;
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
        .then((res) => res.json())
        .then((json) => {
          this.currentToolInfo.wikiExtract = Object.values(
            json.query.pages
          )[0].extract;
          this.$forceUpdate();
        })
        .catch((err) => {
          this.currentToolInfo.wikiExtract = this.$t("skills.errorExtractFail");
        });
    },
  },
  beforeMount: function () {
    // links each tool to every project using it
    let mapToolsToReferences = new Map();
    this.$t("projects.projectList").forEach((project, index) => {
      project.id = index;
      project.info.tools.forEach((tool) => {
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
  data: function () {
    return {
      themeMode: "dark",
      mapToolsToReferences: new Map(),
      showInfoWiki: false,
      showDetailProjects: false,
      currentTool: "",
      currentToolInfo: {},
  }
}
.dark .dev-icons :hover {
  color: $secondary;
}
.light .dev-icons :hover {
  color: $primary;
}
</style>
