// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AccountsRoot from '../AccountsRoot.vue'

describe('AccountsRoot интеграция', () => {
  it('по клику на + в Header добавляет строку в форму', async () => {
    const wrapper = mount(AccountsRoot, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)

    let rows = wrapper.findAll('[data-test="account-row"]')
    const initialCount = rows.length

    await btn.trigger('click')

    rows = wrapper.findAll('[data-test="account-row"]')
    expect(rows.length).toBeGreaterThan(initialCount)
  })
})
