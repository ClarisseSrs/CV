<template>
  <section id="education" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">{{$t('education.diplomas')}}</h2>
      <div
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5"
        v-for="(education, index) in $t('education.educationList')"
        :key="index">
        <div class="resume-content">
          <h3 class="mb-0">{{ education.school }}</h3>
          <div class="subheading mb-3">
            <a :href="education.url" target="_blank" rel='noopener' v-if="education.url">{{ education.degree }}</a>
            <span v-else>{{ education.degree }}</span>
          </div>
          <div class="lead font-weight-bold">{{ education.program }}</div>
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
};
</script>