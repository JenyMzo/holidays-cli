
import { expect, it } from 'vitest'
import { HolidayStorage } from '../../types.js'
import { holidaysData } from '../../fixtures/holidays.js'
import { formatHolidays } from './SanitizeHolidays.js';


it('Should format a given holiday object', () => {
  const expected: HolidayStorage[] = [
    {
      date: '2022-11-24',
      name: 'Thanksgiving Day',
      counties: null,
      types: 'Public'
    },
    {
      date: '2022-12-26',
      name: 'Christmas Day',
      counties: null,
      types: 'Public'
    },
    {
      date: '2023-01-02',
      name: 'New Year\'s Day',
      counties: null,
      types: 'Public'
    }
  ];
  expect(formatHolidays(holidaysData)).toEqual(expected);
});
