<script lang="ts" setup>
const { notes, removeNote, resetNotes, getNotes } = useNotes()

onMounted(getNotes)
onUnmounted(resetNotes)
</script>

<template>
  <p class="mb-4 text-center text-lg font-semibold text-gray-800">Notes</p>
  <template v-if="notes.loading">
    <Loading />
  </template>
  <template v-else-if="notes.data.length">
    <ul
      class="mx-auto mb-6 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li
        v-for="note in notes.data"
        :key="note.id"
        class="relative min-h-45 -rotate-1 rounded-sm border border-yellow-200 bg-yellow-200 p-4 shadow-md"
      >
        <div
          class="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-yellow-100/80 shadow-sm"
        />

        <p class="pb-12 text-sm leading-6 text-gray-800">
          {{ note.note }}
        </p>

        <button
          type="button"
          class="absolute bottom-3 right-3 not-[]:px-3 py-1 hover:opacity-50"
          @click="removeNote(note.id)"
        >
          🗑️
        </button>
      </li>
    </ul>
  </template>
  <template v-else>
    <p class="mb-6 text-center text-gray-500">No notes yet. Add one below!</p>
  </template>
  <AddNote />
</template>
