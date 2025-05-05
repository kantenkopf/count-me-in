<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  isLoading: boolean;
  isError: boolean;
}>();
</script>

<template>
  <div
    v-if="props.isLoading && !props.isError"
    class="text-message"
    data-test="loading-message"
  >
    <p>
      Establishing connection
      <span class="dots"></span>
    </p>
  </div>
</template>
