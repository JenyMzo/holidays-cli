
import { expect, it, describe, vi } from 'vitest'
import storage from 'node-persist';
import { getData } from './PersistDataService.js';

vi.mock('node-persist');

describe('PersistDataService', () => {
  const data = {
    key: 'data-us',
    value: [
    {
      date: '2022-11-24',
    },
    {
      date: '2022-12-26',
    },
    {
      date: '2023-01-02',
    }]
  }
  describe('getData', () => {
    it('if everything goes ok', async() => {
      storage.getItem = vi.fn().mockResolvedValue(data);
      expect(await getData('foo')).toEqual(data);
    });
  });
});

