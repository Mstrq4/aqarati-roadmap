import test from 'node:test'
import assert from 'node:assert/strict'
import { nextTheme } from '../../src/lib/theme.ts'

test('nextTheme toggles light to dark and dark to light', () => {
  assert.equal(nextTheme('light'), 'dark')
  assert.equal(nextTheme('dark'), 'light')
})
