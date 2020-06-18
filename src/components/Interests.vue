<template>
  <section id="interests" class="resume-section p-3 p-lg-5 d-flex align-items-center">
    <div class="w-100">
      <h2 class="mb-5">{{$t('interests.interests')}}</h2>
      <p class="lead font-weight-bold" v-html="$t('interests.interestsHTML')"></p>
    </div>
  </section>
</template>

<script>
export default {
};
</script>