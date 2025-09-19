<template>
  <div class="flex flex-col gap-y-4">
    <AccountsHeader @add="handleAdd" />
    <AccountsNote />
    <AccountsForm ref="formRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountsHeader from './AccountsHeader.vue'
import AccountsNote from './AccountsNote.vue'
import AccountsForm from './AccountsForm.vue'

type AccountFormExposed = {
  addRow: () => void
}
const formRef = ref<AccountFormExposed | null>(null)

function handleAdd() {
  formRef.value?.addRow()
}
</script>

<style scoped></style>
