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
  <div class="xyz-card shadow-lg rounded-xl">
    <figure v-if="media">
      <img :src="media" />
    </figure>
    <div class="card-body">
      <h2 class="card-title font-display text-2xl">{{ title }}</h2>
      <p>
        {{ content }}
      </p>
      <div class="card-actions">
        <slot name="actions">
          <XyzButton class="btn-primary"> Awiwi </XyzButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.xyz-card {
}
</style>
