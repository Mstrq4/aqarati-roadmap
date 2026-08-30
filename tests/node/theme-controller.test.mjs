import test from 'node:test'
import assert from 'node:assert/strict'
const nextTheme=(t)=>t==='dark'?'light':'dark'
test('theme toggles deterministically',()=>{assert.equal(nextTheme('light'),'dark');assert.equal(nextTheme('dark'),'light')})
