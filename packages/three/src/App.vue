<script setup lang="ts">
import { useExperiments } from '/@/composables/useExperiments'

const { filter } = useExperiments()
</script>

<template>
  <div class="absolute inset-0 drawer h-full">
    <input id="left-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <XyzNavbar class="fixed w-full z-50 bg-white">
        <template v-slot:logo>
          <span class="iconify text-primary mr-4" data-icon="mdi:flask"></span>
          <span class="text-lg font-bold text-dark-300">XYZ </span>
        </template>
        <template v-slot:center>
          <span class="iconify" data-icon="heroicons-solid:search"></span>
          <input
            type="text"
            placeholder="Search"
            class="input input-ghost w-full max-w-xs"
            v-model="filter"
          />
        </template>
      </XyzNavbar>
      <router-view />
    </div>
    <div class="drawer-side">
      <label for="left-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li class="menu-title mb-8">
          <h2 class="font-display text-primary text-2xl font-bold">Examples</h2>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
      </ul>
    </div>
  </div>
</template>
