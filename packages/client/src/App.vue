<template>
  <nav>
    <router-link to="/"><img src="@/assets/logo.svg" /></router-link>
  </nav>
  <router-view />
  <footer>
    <router-link to="/about">About</router-link>
  </footer>
</template>

<style>
@import "@/assets/main.css";
</style>
