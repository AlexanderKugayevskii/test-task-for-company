<template>
  <div class="flex items-center gap-x-2 py-4">
    <h1 class="text-3xl font-medium text-primary">Учетные записи</h1>
    <Button variant="outline" type="button" @click="emit('add')">
      <Plus class="text-primary" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Plus } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'add'): void
}>()
</script>

<style scoped></style>
