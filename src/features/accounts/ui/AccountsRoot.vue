<template>
  <div class="flex flex-col gap-y-4">
    <AccountsHeader />
    <AccountsNote />
    <AccountsForm />
  </div>
</template>

<script setup lang="ts">
import AccountsHeader from './AccountsHeader.vue'
import AccountsNote from './AccountsNote.vue'
import AccountsForm from './AccountsForm.vue'
</script>

<style scoped></style>
