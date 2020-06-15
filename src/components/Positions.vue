<template>
  <section id="positions" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">{{$t('positions.positions')}}</h2>
      <div
        class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5"
        v-for="(position, index) in $t('positions.positionList')"
        :key="index">
        <div class="resume-content">
          <h3 class="mb-0">{{ position.position }}</h3>
          <div class="subheading mb-3">
            <a :href="position.url" target="_blank" rel='noopener' v-if="position.url">{{ position.company }}</a>
            <span v-else>{{ position.company }}</span>
            </div>
          <p class="mb-0">{{ position.summary }}</p>
        </div>
        <div class="resume-date text-md-right">
          <span
            class="text-primary"
            v-for="(date, index) in position.dates"
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