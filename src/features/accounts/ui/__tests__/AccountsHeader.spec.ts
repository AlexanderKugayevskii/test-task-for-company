// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccountsHeader from '../AccountsHeader.vue'

describe('AccountsHeader', () => {
  it('эмитит "add" по клику на +', async () => {
    const wrapper = mount(AccountsHeader)

    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)

    await btn.trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')!.length).toBe(1)
  })
})
