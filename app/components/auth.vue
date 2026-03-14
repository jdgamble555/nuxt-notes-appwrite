<script setup lang="ts">
const { user, getUser } = useUser()
onMounted(getUser)
</script>

<template>
  <template v-if="user.loading">
    <Loading />
  </template>
  <template v-else-if="user.data">
    <Logout />
    <Notes />
  </template>
  <template v-else>
    <LoginForm />
  </template>
</template>
