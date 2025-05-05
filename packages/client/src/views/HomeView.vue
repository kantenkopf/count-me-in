<script setup lang="ts">
import { Socket, io } from "socket.io-client";
import { ref, onMounted, onUnmounted } from "vue";

const socket: Socket = io("http://localhost:3000/counter"); // Replace with env variable
const counter = ref<number | null>(null);
const isError = ref<boolean>(false);

onMounted(() => {
  socket.on("connect", () => {
    console.log("Connected to server socket.");
    socket.emit("counter:get");
  });

  socket.on("counter:update", (data) => {
    console.log(`Counter updated: ${data}`);
    counter.value = data;
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

const incrementCounter = (): void => {
  socket.emit("counter:increment");
};
</script>

<template>
  <div class="home">
    <div v-if="isError" data-test="error-message">
      <p>We could not establish a connection to the Server.</p>
      <p>Please try to refresh your page or return later.</p>
    </div>
    <div v-if="!isError" data-test="counter">{{ counter }}</div>
    <button
      :disabled="isError"
      @click="incrementCounter"
      data-test="counter-button"
    >
      Counter ++
    </button>
  </div>
</template>
