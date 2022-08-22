import { Holiday } from '../../types.js';

export const formatHolidays = async(holidays: Holiday[]) => {

  const formattedHolidays = holidays.map(holiday => {
    return {
      date: holiday.date,
      name: holiday.name,
      counties: holiday.counties, // todo: format counties to show them all in the table
      types: holiday.types?.join(', '),
    }
  });
  return formattedHolidays;
}
