<script setup lang="ts">
import { Socket, io } from 'socket.io-client';
import { ref, onMounted, onUnmounted } from 'vue';

const socket: Socket = io('http://localhost:3000/counter'); // Replace with env variable
const counter = ref<number | null>(null);

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to server socket.');
    socket.emit('counter:get');
  });

  socket.on('counter:update', (data) => {
    console.log(`Counter updated: ${data}`);
    counter.value = data;
  });
});

onUnmounted(() => {
  socket.disconnect();
  console.log('Socket disconnected');
});

const incrementCounter = (): void => {
  socket.emit('counter:increment');
};
</script>

<template>
  <div class="home">
    <div>{{ counter }}</div>
    <button @click="incrementCounter">Counter ++</button>
  </div>
</template>
