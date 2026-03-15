<script setup lang="ts">
const { login, register, authError, authForm } = useAuth()

const isLogin = ref(true)
</script>

<template>
  <div
    class="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
  >
    <form class="space-y-3">
      <input
        autocomplete="email"
        type="email"
        placeholder="Email"
        v-model="authForm.email"
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
      />

      <input
        autocomplete="current-password"
        type="password"
        placeholder="Password"
        v-model="authForm.password"
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
      />

      <template v-if="isLogin">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <button
            type="button"
            @click="isLogin = false"
            class="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </template>
      <template v-else>
        <input
          autocomplete="name"
          type="text"
          placeholder="Name"
          v-model="authForm.name"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500"
        />
        <p class="text-sm text-gray-600">
          Already have an account?
          <button
            type="button"
            @click="isLogin = true"
            class="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </template>

      <template v-if="isLogin">
        <button
          type="button"
          @click="login"
          class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Login
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          @click="register"
          class="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-300"
        >
          Register
        </button>
      </template>
      <template v-if="authError">
        <p class="mt-2 text-sm text-red-600">{{ authError }}</p>
      </template>
    </form>
  </div>
</template>
