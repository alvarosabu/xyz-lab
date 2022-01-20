<script setup lang="ts">
import { ref } from 'vue'

const state = ref({})
</script>
<template>
  <div class="xyz-navbar navbar mb-2 shadow-lg">
    <div class="flex-none hidden lg:flex">
      <input id="left-drawer" type="checkbox" class="drawer-toggle" />
      <label for="left-drawer" class="btn btn-primary btn-square drawer-button"
        ><span class="iconify" data-icon="heroicons-solid:menu"
      /></label>
    </div>
    <div class="flex-1 hidden px-2 mx-2 lg:flex">
      <slot name="logo"><span class="text-lg font-bold">xyzNavbar</span></slot>
    </div>
  </div>
</template>
