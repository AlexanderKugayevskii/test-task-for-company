// src/features/accounts/model/__tests__/schema.spec.ts
import { describe, it, expect } from 'vitest'
import { accountRowSchema } from '../schema'

describe('accountRowSchema', () => {
  it('валидно: local c паролем ≥ 8', () => {
    const res = accountRowSchema.safeParse({
      id: '1',
      labels: 'a; b',
      type: 'local',
      login: 'user1',
      password: 'password1',
    })
    expect(res.success).toBe(true)
  })

  it('невалидно: local без пароля', () => {
    const res = accountRowSchema.safeParse({
      id: '1',
      labels: '',
      type: 'local',
      login: 'user1',
      password: '', // пусто
    })
    expect(res.success).toBe(false)
    expect(JSON.stringify(res)).toContain('password')
  })

  it('валидно: ldap с password = null', () => {
    const res = accountRowSchema.safeParse({
      id: '2',
      labels: null,
      type: 'ldap',
      login: 'ldap-user',
      password: null, // ← важно
    })
    expect(res.success).toBe(true)
  })

  it('невалидно: пустой login', () => {
    const res = accountRowSchema.safeParse({
      id: '3',
      labels: undefined,
      type: 'local',
      login: '',
      password: 'password1',
    })
    expect(res.success).toBe(false)
    expect(JSON.stringify(res)).toContain('login')
  })
})
