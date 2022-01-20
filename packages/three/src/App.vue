<script setup lang="ts"></script>

<template>
  <div class="absolute inset-0 drawer h-full">
    <input id="left-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <XyzNavbar class="mb-8">
        <template v-slot:logo>
          <span class="text-lg font-bold">Three Journey</span>
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
