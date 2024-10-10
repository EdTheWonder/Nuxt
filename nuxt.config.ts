// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  supabase: {
    url: 'https://yznbhaszuemqkzmcctmt.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bmJoYXN6dWVtcWt6bWNjdG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1ODk3MDQsImV4cCI6MjA0NDE2NTcwNH0.SgUJUi48DoVyOihXA9Y8yXHG7-PbYIXzG2kjdfKezbc',
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/'],
    },
  },
  app: {
    head: {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' }
      ]
    }
  }
})