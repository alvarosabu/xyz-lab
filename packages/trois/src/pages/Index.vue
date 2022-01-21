<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const [, ...routes] = router.getRoutes()
</script>
<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-4">
      <XyzCard
        :title="route.name"
        :content="route.meta.description"
        :media="route.meta.media"
        v-for="route of routes"
        :key="route.path"
      >
        <template #actions>
          <router-link :to="route.path" class="btn btn-primary">
            Check experiment
          </router-link>
        </template>
      </XyzCard>
    </div>
  </div>
</template>
