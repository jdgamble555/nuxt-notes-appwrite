<script setup lang="ts">
const { logout } = useAuth();
const { user } = useUser();
</script>

<template>
  <h1>Hello {{ user.data?.name }}</h1>
  <button
    type="button"
    @click="logout"
    class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-300"
  >
    Logout
  </button>
</template>
