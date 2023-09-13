import test from 'node:test';
import assert from 'node:assert';
import mathUtils from '../dist/math.js';

test('math utils', (t) => {

    t.test('sigmoid', () => {

        assert.strictEqual(mathUtils.sigmoid(0), 0.5);
    
    });

});
