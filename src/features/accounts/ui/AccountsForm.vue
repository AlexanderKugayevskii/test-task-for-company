<template>
  <div>
    <div class="grid grid-cols-[1fr_0.5fr_1fr_1fr_42px] gap-3 mb-4">
      <div class="text-muted-foreground">Метки</div>
      <div class="text-muted-foreground">Тип записи</div>
      <div class="text-muted-foreground">Логин</div>
      <div class="text-muted-foreground">Пароль</div>
      <div></div>
    </div>

    <div>
      <form @submit.prevent>
        <div class="space-y-3">
          <AccountRow v-for="(row, index) in fields" :key="row.key" :index="index" @remove="handleRemove(index)" :form="form" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { accountsFormSchema, type AccountsFormInput } from '../model/schema'
import { useAccountsStore } from '../model/accountsStore'
import { labelsToString } from '../utils/labels'
import { useForm, useFieldArray } from 'vee-validate'
import { newId } from '../utils/generateId'
import type { AccountType } from '../types'
import AccountRow from './AccountRow.vue'

const accountsStore = useAccountsStore()

const initialAccounts = accountsStore.records.length
  ? accountsStore.records.map((record) => ({
      id: record.id || newId(),
      labels: labelsToString(record.labels),
      type: record.type,
      login: record.login,
      password: record.password ?? null,
    }))
  : [{ id: newId(), labels: '', type: 'local' as AccountType, login: '', password: null }]

const form = useForm<AccountsFormInput>({
  validationSchema: toTypedSchema(accountsFormSchema),
  initialValues: { accounts: initialAccounts },
})

const { fields, push, remove } = useFieldArray('accounts')

const addRow = () => {
  push({ id: newId(), labels: '', type: 'local' as AccountType, login: '', password: null })
}

function handleRemove(index: number) {
  const id = form.values.accounts[index]?.id
  remove(index)
  if (id) accountsStore.remove(id)
}

defineExpose<{ addRow: () => void }>({ addRow })
</script>

<style scoped></style>
