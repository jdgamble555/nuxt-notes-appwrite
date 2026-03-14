<script lang="ts" setup>
const { addNote, noteError, newNote } = useNotes()
</script>

<template>
  <form class="mx-auto flex max-w-md gap-2">
    <textarea
      autocomplete="note"
      type="text"
      name="note"
      v-model="newNote"
      placeholder="Enter a note"
      class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
    />
    <button
      type="submit"
      @click.prevent="addNote"
      class="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
    >
      Add Note
    </button>
  </form>

  <p v-if="noteError" class="mx-auto mt-2 max-w-md text-sm text-red-600">
    {{ noteError }}
  </p>
</template>
