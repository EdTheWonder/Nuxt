<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block mb-1">Email</label>
        <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <label for="password" class="block mb-1">Password</label>
        <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border rounded">
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
    <p class="mt-4 text-center">
      Don't have an account? <NuxtLink to="/register" class="text-blue-600">Register</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    router.push('/recorder')
  } catch (error) {
    alert(error.message)
  }
}
</script>