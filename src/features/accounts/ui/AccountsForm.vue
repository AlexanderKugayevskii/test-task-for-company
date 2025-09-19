<template>
  <div>
    <div class="grid grid-cols-5">
      <div class="text-muted-foreground">Метки</div>
      <div class="text-muted-foreground">Тип записи</div>
      <div class="text-muted-foreground">Логин</div>
      <div class="text-muted-foreground">Пароль</div>
    </div>
    <div>
      <form @submit.prevent="onSubmit">
        <div class="flex items-center justify-between">
          <Button type="button" class="border px-3 py-1 rounded" @click="addRow">+ Добавить</Button>
        </div>
        <div class="space-y-3">
          <div
            v-for="(row, index) in fields"
            :key="row.key"
            class="grid grid-cols-[1fr_auto] items-start gap-2 border rounded p-3"
          >
            <div class="grid gap-2 md:grid-cols-4">
              <!-- labels (опционально) -->
              <div class="flex flex-col">
                <Field
                  :name="`accounts[${index}].labels`"
                  as="input"
                  type="text"
                  class="border rounded px-2 py-1"
                  placeholder="a; b; c"
                />
                <ErrorMessage
                  :name="`accounts[${index}].labels`"
                  class="text-red-500 text-xs mt-1"
                />
              </div>

              <!-- type -->
              <div class="flex flex-col">
                <Field
                  :name="`accounts[${index}].type`"
                  as="select"
                  class="border rounded px-2 py-1"
                >
                  <option value="local">Локальная</option>
                  <option value="ldap">LDAP</option>
                </Field>
                <ErrorMessage :name="`accounts[${index}].type`" class="text-red-500 text-xs mt-1" />
              </div>

              <!-- login -->
              <div class="flex flex-col">
                <Field
                  :name="`accounts[${index}].login`"
                  as="input"
                  type="text"
                  class="border rounded px-2 py-1"
                />
                <ErrorMessage
                  :name="`accounts[${index}].login`"
                  class="text-red-500 text-xs mt-1"
                />
              </div>

              <!-- password (правила добавим на следующем шаге) -->
              <div class="flex flex-col">
                <Field
                  :name="`accounts[${index}].password`"
                  as="input"
                  type="password"
                  class="border rounded px-2 py-1"
                />
                <ErrorMessage
                  :name="`accounts[${index}].password`"
                  class="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <!-- удалить строку -->
            <Button type="button" class="border px-3 py-1 rounded" @click="remove(index)">
              Удалить
            </Button>
          </div>
        </div>
        <PasswordInput />
        <Button type="submit" class="border px-3 py-1 rounded">Проверить</Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import { ErrorMessage, Field, useFieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { accountsFormSchema, type AccountRowInput, type AccountsFormInput } from '../model/schema'
import { useAccountsStore } from '../model/accountsStore'
import { labelsToString } from '../utils/labels'

import { Button } from '@/shared/ui/button'
import { PasswordInput } from '@/shared/ui/password'
import type { AccountType } from '../types'

const accountsStore = useAccountsStore()
const newId = () => nanoid()

const initialAccounts = accountsStore.records.length
  ? accountsStore.records.map((record) => ({
      id: newId(),
      labels: labelsToString(record.labels),
      type: record.type,
      login: record.login,
      password: record.password ?? '',
    }))
  : [{ id: newId(), labels: '', type: 'local' as AccountType, login: '', password: '' }]

const form = useForm<AccountsFormInput>({
  validationSchema: toTypedSchema(accountsFormSchema),
  initialValues: { accounts: initialAccounts },
})

const { fields, push, remove } = useFieldArray<AccountRowInput>('accounts')

function addRow() {
  push({ id: newId(), labels: '', type: 'local' as AccountType, login: '', password: '' })
}

const onSubmit = form.handleSubmit(
  (values) => console.log('VALID:', values),
  (errors) => console.log('INVALID:', errors),
)
</script>

<style scoped></style>
