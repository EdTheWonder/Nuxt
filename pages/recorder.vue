<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Audio Recorder</h2>
    <div class="space-y-4">
      <button @click="startRecording" :disabled="isRecording" class="w-full bg-green-600 text-white py-2 rounded">
        Start Recording
      </button>
      <button @click="stopRecording" :disabled="!isRecording" class="w-full bg-red-600 text-white py-2 rounded">
        Stop Recording
      </button>
      <audio v-if="audioUrl" :src="audioUrl" controls class="w-full"></audio>
      <button v-if="audioUrl" @click="saveRecording" class="w-full bg-blue-600 text-white py-2 rounded">
        Save Recording
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { gsap } from 'gsap'

const supabase = useSupabaseClient()

const isRecording = ref(false)
const audioUrl = ref(null)
let mediaRecorder = null
let audioChunks = []

onMounted(() => {
  gsap.from('h2', { opacity: 0, y: -30, duration: 1 })
  gsap.from('button', { opacity: 0, y: -10, duration: 1, stagger: 0.2 })
})

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      audioUrl.value = URL.createObjectURL(audioBlob)
      audioChunks = []
    }
    mediaRecorder.start()
    isRecording.value = true
  } catch (error) {
    console.error('Error accessing microphone:', error)
    alert('Unable to access microphone. Please check your browser permissions.')
  }
}

const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
    isRecording.value = false
  }
}

const saveRecording = async () => {
  if (!audioUrl.value) return

  try {
    const response = await fetch(audioUrl.value)
    const blob = await response.blob()
    const fileName = `recording_${Date.now()}.wav`
    const { data, error } = await supabase.storage
      .from('audio-recordings')
      .upload(fileName, blob)

    if (error) throw error
    alert('Recording saved successfully!')
    audioUrl.value = null
  } catch (error) {
    console.error('Error saving recording:', error)
    alert('Failed to save recording. Please try again.')
  }
}
</script>