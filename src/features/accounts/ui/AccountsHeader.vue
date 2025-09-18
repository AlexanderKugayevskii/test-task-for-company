<template>
  <div class="flex items-center gap-x-2 py-4">
    <h1 class="text-3xl font-medium text-primary">Учетные записи</h1>
    <TheButton variant="outline">
      <Plus class = "text-primary"/>
    </TheButton>
  </div>
</template>

<script setup lang="ts">
import TheButton from '@/shared/ui/button/TheButton.vue'
import { Plus } from 'lucide-vue-next'
</script>

<style scoped></style>
