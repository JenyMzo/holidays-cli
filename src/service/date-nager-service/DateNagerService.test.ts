/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect, it, describe, vi, afterEach } from 'vitest'
import fetch from 'node-fetch';
import { getUpcomingHolidays, getValidcountryCode } from './DateNagerService.js';

// afterEach(() => {
//   vi.clearAllMocks();
// })

vi.mock('node-fetch', () => ({
  __esModule: true,
  default: vi.fn().mockResolvedValueOnce({
    json: () => (
      Promise.resolve([ {id: 5}, {id: 4}, {id: 3}, {id: 2}, {id: 1}, {id: 0} ])
    )
    }),
}));

describe('DateNagerService', () => {
  describe('getUpcomingHolidays', () => {
    describe('if everything goes ok', () => {
      it('should return the first 5 results', async() => {
        const expected = [
          { id: 5 }, { id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }
        ];
        expect(await getUpcomingHolidays('foo')).toEqual(expected);
      });
    });

    describe('if something goes wrong', () => {
      it('should return an empty array', async() => {

        (fetch as any).mockRejectedValue({
          json: () => (
            Promise.reject([])
          )
        });

        expect(await getUpcomingHolidays('foo')).toEqual([]);
      });
    });
  });

  describe('getValidCountry', () => {
    describe('if everything goes ok', () => {
      it('should return the first 5 results', async() => {

      (fetch as any).mockResolvedValueOnce({
          json: () => (
            Promise.resolve([ {countryCode: 'A'}, {countryCode: 'B'}, {countryCode: 'C'}])
          )
        });

        const expected = { countryCode: 'B' }
        expect(await getValidcountryCode('b')).toEqual(expected);
      });
    });

    describe('if the country is not found', () => {
      it('should return undefined', async() => {

        (fetch as any).mockRejectedValue({
          json: () => (
            Promise.resolve(undefined)
          )
        });

        expect(await getValidcountryCode('foo')).toBeUndefined();
      });
    });
  });
});
