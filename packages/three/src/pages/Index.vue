<script setup lang="ts">
import { useExperiments } from '/@/composables/useExperiments'

const { filtered } = useExperiments()
</script>
<template>
  <div class="container my-16 px-4 sm:px-0 mx-auto pt-8">
    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <router-link :to="route.path" v-for="route of filtered">
        <XyzCard
          :title="route.name"
          :media="route.meta.media"
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
        </XyzCard>
      </router-link>
    </div>
  </div>
</template>
