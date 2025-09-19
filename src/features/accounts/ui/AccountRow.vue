<template>
  <div class="grid grid-cols-[1fr_auto] items-start gap-2 border rounded p-3">
    <div class="grid gap-3 md:grid-cols-4">
      <FormField :name="`${base}.labels`" v-slot="{ componentField, meta }">
        <FormItem>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="a; b; c"
              @blur="validateAndSaveRow"
              :aria-invalid="!meta.valid && meta.validated"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField :name="`${base}.type`" v-slot="{ componentField }">
        <FormItem>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="local">Локальная</SelectItem>
              <SelectItem value="ldap">LDAP</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField :name="`${base}.login`" v-slot="{ componentField, meta }">
        <FormItem>
          <FormControl>
            <Input
              v-bind="componentField"
              @blur="validateAndSaveRow"
              :aria-invalid="!meta.valid && meta.validated"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField :name="`${base}.password`" v-slot="{ componentField, meta, form }">
        <FormItem>
          <FormControl>
            <PasswordInput
              v-bind="componentField"
              :disabled="form?.values?.accounts?.[index]?.type === 'ldap'"
              @blur="validateAndSaveRow"
              :aria-invalid="!meta.valid && meta.validated"
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
import { useForm } from 'vee-validate'
import type { AccountsFormInput } from '../model/schema'
import { useAccountsStore } from '../model/accountsStore'
import { parseLabels } from '../utils/labels'

import { FormField, FormItem, FormControl, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/password'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  index: number
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const { values, validateField, setFieldValue } = useForm<AccountsFormInput>()
const accountsStore = useAccountsStore()

const base = computed(() => `accounts[${props.index}]`)

async function validateAndSaveRow() {
  type FieldName = Parameters<typeof validateField>[0]

  const names = [
    `${base.value}.type`,
    `${base.value}.login`,
    `${base.value}.password`,
  ] as unknown as FieldName[]

  const results = await Promise.all(names.map((name) => validateField(name)))
  const ok = results.every((res) => !res)

  if (!ok) return

  const row = values.accounts[props.index]

  accountsStore.upsert({
    id: row.id,
    type: row.type,
    login: row.login.trim(),
    password: row.type === 'local' ? (row.password ?? '') : undefined,
    labels: parseLabels(row.labels || ''),
  })
}

function handleTypeChange(next: 'local' | 'ldap') {
  setFieldValue(`${base.value}.type`, next)
  if (next === 'ldap') {
    setFieldValue(`${base.value}.password`, '')
  }

  validateAndSaveRow()
}

function onTypeSelect(val: unknown) {
  if (val !== 'local' && val !== 'ldap') return

  handleTypeChange(val)
}
</script>

<style scoped></style>
