<script setup lang="ts">
import ConnectionLoader from "@/components/ConnectionLoader.vue";
import CounterDisplay from "@/components/CounterDisplay.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import IncrementButton from "@/components/IncrementButton.vue";
import ENV from "@/env";
import { Socket, io } from "socket.io-client";
import { ref, onMounted, onUnmounted } from "vue";

const socket: Socket = io(ENV.SOCKET_URL_COUNTER); // Replace with env variable
const counter = ref<number | null>(null);
const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);
const wasIncremented = ref<boolean>(false);

onMounted(() => {
  socket.on("connect", () => {
    console.log("Connected to server socket.");
    isLoading.value = false;
    isError.value = false;
    socket.emit("counter:get");
  });

  socket.on("counter:update", (data) => {
    wasIncremented.value = true;
    counter.value = data;

    setTimeout(() => {
      wasIncremented.value = false;
    }, 300);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
    isError.value = true;
  });
});

onUnmounted(() => {
  socket.disconnect();
  console.log("Socket disconnected");
});

const handleIncrement = (): void => {
  socket.emit("counter:increment");
};
</script>

<template>
  <div class="main-content">
    <ConnectionLoader
      :is-loading="isLoading"
      :is-error="isError"
    ></ConnectionLoader>
    <ErrorMessage :is-error="isError"></ErrorMessage>
    <CounterDisplay
      :is-error="isError"
      :is-loading="isLoading"
      :was-incremented="wasIncremented"
      :counter="counter"
    ></CounterDisplay>
    <IncrementButton
      :is-error="isError"
      :is-loading="isLoading"
      :handle-increment="handleIncrement"
    ></IncrementButton>
  </div>
</template>
