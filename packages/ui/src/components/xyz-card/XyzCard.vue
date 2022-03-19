<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  media: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <div class="xyz-card shadow-lg rounded-xl overflow-hidden">
    <figure v-if="media" class="aspect-video overflow-hidden">
      <img :src="media" />
    </figure>
    <div class="card-body">
      <h2 class="card-title font-display text-2xl">{{ title }}</h2>
      <slot>
        <p class="card-text">{{ content }}</p>
      </slot>
      <div class="card-actions">
        <slot name="actions"> </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.xyz-card {
}
</style>
