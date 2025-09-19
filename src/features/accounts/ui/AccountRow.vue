<template>
  <div class="grid grid-cols-[1fr_auto] items-start gap-2" data-test="account-row">
    <div class="grid gap-3 md:grid-cols-[1fr_0.5fr_1fr_1fr]">
      <FormField :name="`${base}.labels`" v-slot="{ componentField, meta }">
        <FormItem>
          <FormControl>
            <Input v-bind="componentField" placeholder="a; b; c" @blur="validateAndSaveRow" :aria-invalid="!meta.valid && meta.validated" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField :name="`${base}.type`" v-slot="{ componentField, value }">
        <FormItem>
          <FormControl>
            <Select
              v-bind="componentField"
              :defaultValue="value"
              :modelValue="value"
              @update:modelValue="(val) => handleTypeChange(val as 'local' | 'ldap')"
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="local">Локальная</SelectItem>
                <SelectItem value="ldap">LDAP</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField :name="`${base}.login`" v-slot="{ componentField, meta }">
        <FormItem :class="{ 'col-span-2': values.accounts?.[index]?.type === 'ldap' }">
          <FormControl>
            <Input
              v-bind="componentField"
              @blur="validateAndSaveRow"
              :aria-invalid="!meta.valid && meta.validated"
              placeholder="логин"
              autocomplete="off"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField :name="`${base}.password`" v-slot="{ componentField, meta }" v-if="values.accounts?.[index]?.type === 'local'">
        <FormItem>
          <FormControl>
            <PasswordInput
              v-bind="componentField"
              :disabled="values.accounts?.[index]?.type === 'ldap'"
              @blur="validateAndSaveRow"
              :aria-invalid="!meta.valid && meta.validated"
              placeholder="пароль"
              autocomplete="new-password"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <Button type="button" class="border px-3 py-1 rounded" @click="emit('remove')">
      <Trash2 class="size-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FormContext, PathValue } from 'vee-validate'
import type { AccountsFormInput } from '../model/schema'
import { useAccountsStore } from '../model/accountsStore'
import { parseLabels } from '../utils/labels'

import { FormField, FormItem, FormControl, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { Trash2 } from 'lucide-vue-next'

type Row = AccountsFormInput['accounts'][number]
type RowKey = keyof Row
type RowPath<K extends RowKey> = `accounts[${number}].${K}`

const props = defineProps<{
  index: number
  form: FormContext<AccountsFormInput>
}>()

const rowPath = <K extends RowKey>(key: K): RowPath<K> => `accounts[${props.index}].${key}` as RowPath<K>

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const { values, validateField, setFieldValue } = props.form
const accountsStore = useAccountsStore()

const base = computed(() => `accounts[${props.index}]`)

function setRowField<K extends RowKey>(key: K, value: Row[K]) {
  const p = rowPath(key)
  setFieldValue(p, value as PathValue<AccountsFormInput, typeof p>)
}

async function validateAndSaveRow() {
  const names = [rowPath('type'), rowPath('login'), rowPath('password')]

  const results = await Promise.all(
    names.map((name) => {
      return validateField(name)
    }),
  )
  const ok = results.every((res) => res.valid)
  if (!ok) return

  const row = values.accounts[props.index]

  accountsStore.upsert({
    id: row.id,
    type: row.type,
    login: row.login?.trim(),
    password: row.type === 'local' ? (row.password ?? '') : null,
    labels: parseLabels(row.labels || ''),
  })
}

function handleTypeChange(next: 'local' | 'ldap') {
  setRowField('type', next)
  if (next === 'ldap') setRowField('password', '')
  validateAndSaveRow()
}
</script>
