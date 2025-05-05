<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  isLoading: boolean;
  isError: boolean;
  handleIncrement: () => void;
}>();
</script>

<template>
  <button
    :disabled="props.isError || props.isLoading"
    @click="props.handleIncrement"
    data-test="counter-button"
  >
    COUNTER ++
  </button>
</template>
