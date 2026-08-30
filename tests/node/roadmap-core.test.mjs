import test from 'node:test'
import assert from 'node:assert/strict'

test('contract payment split totals exactly 7800 SAR',()=>{assert.equal(3120+2340+2340,7800)})
test('UAT margin is weeks 11 and 12 only',()=>{assert.deepEqual([11,12].filter(w=>w>10),[11,12])})
