<script setup lang="ts">
const props = defineProps<{
  isError: boolean;
  isLoading: boolean;
  wasIncremented: boolean;
  counter: number | null;
}>();
</script>

<template>
  <div
    v-if="!props.isError && !props.isLoading"
    :class="['counter', { scaled: props.wasIncremented }]"
    data-test="counter"
  >
    {{ props.counter }}
  </div>
</template>
