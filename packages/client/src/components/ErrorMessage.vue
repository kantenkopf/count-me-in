<script setup lang="ts">
const props = defineProps<{
  isError: boolean;
}>();
</script>

<template>
  <div v-if="props.isError" data-test="error-message" class="text-message">
    <p>We could not establish a connection to the Server.</p>
    <p>Please try to refresh your page or return later.</p>
  </div>
</template>
