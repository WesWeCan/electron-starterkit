<script setup lang="ts">
import { onMounted, ref, provide, inject, InjectionKey } from '@vue/runtime-core';
import { useRouter, useRoute } from "vue-router";

import axios from 'axios';
import io from 'socket.io-client';

const router = useRouter();
const socket = io("http://localhost:3000");


onMounted(() => {

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });

  socket.on("message", (message) => {
    console.log(message);
  });

})



const openInBrowser = ($event : Event, url : string) => {
  $event.preventDefault();
  axios.post("http://localhost:9045/open", { url: url });
}



</script>

<template>
  <div id="app">
    <router-view />


    <a href="https://www.google.com" @click="openInBrowser($event, 'https://www.google.com')">Open Google in browser</a>
  </div>
  </template>

