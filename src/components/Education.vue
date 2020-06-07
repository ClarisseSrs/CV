<template>
  <section id="education" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">Diplômes</h2>
      <div
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5"
        v-for="(education, index) in educationList"
        :key="index">
        <div class="resume-content">
          <h3 class="mb-0">{{ education.school }}</h3>
          <div class="subheading mb-3">
            <a :href="education.url" target="_blank" rel='noopener' v-if="education.url">{{ education.degree }}</a>
            <span v-else>{{ education.degree }}</span>
          </div>
          <div class="font-weight-bold">{{ education.program }}</div>
        </div>
        <div class="resume-date text-md-right">
          <span
            class="text-primary"
            v-for="(date, index) in education.dates"
            :key="index"
          >{{ date.start }} - {{ date.end }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      educationList: [
        {
          school: "Université du Québec à Chicoutimi",
          degree: "Maîtrise d'informatique",
          program: "Informatique concentration Jeu Vidéo",
          url: "https://www.uqac.ca/programme/1537-maitrise-en-informatique-jeux-video/",
          dates: [
            {
              start: "Aout 2017",
              end: "Juin 2018"
            }
          ]
        },
        {
          school: "Institut Supérieur d'électronique et du Numérique - Lille",
          degree: "Ingénieur Sécurité des Systèmes d’information",
          program: "Cycle Ingénieur",
          url: "https://www.isen-lille.fr/formation/cycle-ingenieur/domaines-de-professionnalisation/cybersecurite/",
          dates: [
            {
              start: "Septembre 2015",
              end: "Juin 2018"
            }
          ]
        },
        {
          school: "Institut Supérieur d'électronique et du Numérique - Lille",
          degree: "Bachelor",
          program: "Cycle Préparatoire Informatique et Réseaux",
          url: "https://www.isen-lille.fr/formation/cycle-preparatoire/cycle-preparatoire-informatique-et-reseaux/",
          dates: [
            {
              start: "Septembre 2013",
              end: "Juin 2015"
            }
          ]
        }
      ]
    };
  }
};
</script>