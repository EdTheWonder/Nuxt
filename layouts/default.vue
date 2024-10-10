<template>
  <div>
    <nav class="bg-blue-600 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-white text-2xl font-bold">Audio Recorder</NuxtLink>
        <div v-if="user">
          <NuxtLink to="/recorder" class="text-white mr-4">Recorder</NuxtLink>
          <button @click="handleLogout" class="text-white">Logout</button>
        </div>
        <NuxtLink v-else to="/login" class="text-white">Login</NuxtLink>
      </div>
    </nav>
    <main class="container mx-auto mt-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useSupabaseUser, useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>