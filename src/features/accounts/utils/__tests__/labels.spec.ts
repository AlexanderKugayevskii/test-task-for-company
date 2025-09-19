import { describe, it, expect } from 'vitest'
import { parseLabels, labelsToString } from '../labels'

describe('labels utils', () => {
  it('parseLabels: разбивает знак ; тримит и убирает пустые', () => {
    expect(parseLabels(' a ; ; b; c  ')).toEqual([{ text: 'a' }, { text: 'b' }, { text: 'c' }])
  })

  it('labelsToString: собирает обратно', () => {
    expect(labelsToString([{ text: 'a' }, { text: 'b' }])).toBe('a; b')
  })

  it('optional: пустая строка/undefined → []', () => {
    expect(parseLabels('')).toEqual([])
    expect(parseLabels(undefined)).toEqual([])
  })
})
