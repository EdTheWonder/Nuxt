<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to Audio Recorder</h1>
    <p class="mb-4">Record and save your audio with ease.</p>
    <NuxtLink v-if="user" to="/recorder" class="bg-blue-600 text-white px-4 py-2 rounded">Go to Recorder</NuxtLink>
    <NuxtLink v-else to="/login" class="bg-blue-600 text-white px-4 py-2 rounded">Login to Start</NuxtLink>
  </div>
</template>

<script setup>
import { useSupabaseUser } from '#imports'
import { onMounted } from 'vue'
import { gsap } from 'gsap'

const user = useSupabaseUser()

onMounted(() => {
  gsap.from('h1', { opacity: 0, y: -50, duration: 1 })
  gsap.from('p', { opacity: 0, y: -30, duration: 1, delay: 0.5 })
  gsap.from('a', { opacity: 0, y: -10, duration: 1, delay: 1 })
})
</script>