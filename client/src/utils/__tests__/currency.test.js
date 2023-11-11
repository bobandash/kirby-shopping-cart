import { describe, it, expect } from 'vitest';
import { convertCurrencyFormat } from '../currency';

describe('convert number to currency', () => {
    it('number will have to digits', () => {
        expect(convertCurrencyFormat(1)).toBe('1.00');
        expect(convertCurrencyFormat(0)).toBe('0.00');
        expect(convertCurrencyFormat(1.1)).toBe('1.10');
    });
});
