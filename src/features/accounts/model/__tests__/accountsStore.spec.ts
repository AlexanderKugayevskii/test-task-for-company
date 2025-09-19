// src/features/accounts/model/__tests__/store.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAccountsStore } from '../accountsStore'

describe('accounts store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('upsert: добавляет новую запись (local)', () => {
    const accountsStore = useAccountsStore()
    accountsStore.upsert({
      id: '1',
      type: 'local',
      login: 'user1',
      password: 'password1',
      labels: [{ text: 'a' }, { text: 'b' }],
    })
    expect(accountsStore.records).toHaveLength(1)
    expect(accountsStore.records[0]).toMatchObject({
      id: '1',
      type: 'local',
      login: 'user1',
      password: 'password1',
    })
  })

  it('upsert: добавляет/обновляет LDAP c password = null', () => {
    const accountsStore = useAccountsStore()

    accountsStore.upsert({
      id: '2',
      type: 'ldap',
      login: 'ldap-user',
      password: null,
      labels: [],
    })

    expect(accountsStore.records).toHaveLength(1)
    expect(accountsStore.records[0]).toMatchObject({
      id: '2',
      type: 'ldap',
      login: 'ldap-user',
      password: null,
    })

    accountsStore.upsert({
      id: '2',
      type: 'ldap',
      login: 'ldap-user-2',
      password: null,
      labels: [{ text: 'x' }],
    })

    expect(accountsStore.records).toHaveLength(1)
    expect(accountsStore.records[0]).toMatchObject({
      id: '2',
      type: 'ldap',
      login: 'ldap-user-2',
      password: null,
      labels: [{ text: 'x' }],
    })
  })

  it('remove: удаляет запись по id', () => {
    const accountsStore = useAccountsStore()
    accountsStore.upsert({ id: '1', type: 'local', login: 'u1', password: 'p1', labels: [] })
    accountsStore.upsert({ id: '2', type: 'ldap', login: 'u2', password: null, labels: [] })

    accountsStore.remove('1')

    expect(accountsStore.records.map((r) => r.id)).toEqual(['2'])
    expect(accountsStore.records[0].password).toBeNull()
  })
})
