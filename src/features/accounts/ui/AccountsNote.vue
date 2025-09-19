<template>
  <div class="p-4 bg-blue-200/40 rounded-lg">
    <p class="text-primary flex items-center gap-x-2">
      <CircleQuestionMark />
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель
        <span class="font-semibold">;</span>
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { CircleQuestionMark } from 'lucide-vue-next'
</script>

<style scoped></style>
