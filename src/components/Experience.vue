<template>
  <section id="experience" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">Postes</h2>
      <div
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5"
        v-for="(experience, index) in experienceList"
        :key="index">
        <div class="resume-content">
          <h3 class="mb-0">{{ experience.position }}</h3>
          <div class="subheading mb-3">
            <a :href="experience.url" target="_blank" v-if="experience.url">{{ experience.company }}</a>
            <span v-else>{{ experience.company }}</span>
            </div>
          <p class="mb-0">{{ experience.summary }}</p>
        </div>
        <div class="resume-date text-md-right">
          <span
            class="text-primary"
            v-for="(date, index) in experience.dates"
            :key="index"
          >{{ date.start }} - {{ date.end }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Experience",
  data() {
    return {
      experienceList: [
        {
          position: "Consultant en Simulation",
          company: "ALTEN",
          url:"https://www.alten.fr/",
          summary:
          "Consultant ALTEN chez le client MBDA en tant que : référent C# .Net pour projet Unity, développeur applicatif pour différentes simulations de systèmes (JavaFX, Swing, Unity/C#, VBS3/C++17) et développeur full-stack pour outils de gestion de scénarios (OpenApi, Springboot, Vue.JS, Cesium.JS).",
          dates: [
            {
              start: "Juillet 2018",
              end: "Present"
            }
          ]
        },
        {
          position: "Stagiaire",
          company: "Oxya",
          url:"http://www.oxya.com/index.php",
          summary:
          "Stage en administration SAP et développement d'outils de documentation/administration : Gitlab CE/CI, Asciidoctor, Angular.JS, ASP.Net C#.",
          dates: [
            {
              start: "Mai 2017",
              end: "Août 2017"
            }
          ]
        }
      ]
    };
  }
};
</script>