<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const [, ...routes] = router.getRoutes()
</script>
<template>
  <div class="container mx-auto pt-8">
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <XyzCard
        :title="route.name"
        :media="route.meta.media"
        v-for="route of routes"
        :key="route.path"
      >
        <template #default>
          <p class="card-text text-sm">
            {{ route.meta.description }}
          </p>
          <ul
            class="flex flex-wrap justify-start mt-4"
            v-if="route.meta.tags.length > 0"
          >
            <li v-for="tag in route.meta.tags">
              <span class="badge badge-sm badge-accent mr-2">{{ tag }}</span>
            </li>
          </ul>
        </template>
        <template #actions>
          <router-link :to="route.path" class="btn btn-primary btn-sm">
            Check experiment
          </router-link>
        </template>
      </XyzCard>
    </div>
  </div>
</template>
