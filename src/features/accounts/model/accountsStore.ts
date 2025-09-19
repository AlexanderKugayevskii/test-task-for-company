import { defineStore } from 'pinia'
import type { AccountRecord } from '../types'
import { ref } from 'vue'

export const useAccountsStore = defineStore(
  'accounts',
  () => {
    const records = ref<AccountRecord[]>([])

    const upsert = (record: AccountRecord) => {
      const index = records.value.findIndex((r) => r.id === record.id)
      if (index === -1) records.value.push(record)
      else records.value[index] = { ...record }
    }

    const remove = (id: string) => {
      records.value = records.value.filter((r) => r.id !== id)
    }

    
    return { records, upsert, remove }
  },
  {
    persist: {
      pick: ['records'],
      storage: localStorage,
    },
  },
)
