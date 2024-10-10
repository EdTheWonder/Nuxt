<template>
  <div class="min-h-screen bg-gray-100">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useSupabaseUser } from '#imports'

const user = useSupabaseUser()
</script>