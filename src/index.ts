import fetch from 'node-fetch';
import minimist from 'minimist';
import storage from 'node-persist';
import { Holiday, CountryCode } from './types.js';

const options = minimist(process.argv.slice(2));

if (!options.countryCode) {
  console.error(`Please enter the country code using the '--countryCode=' parameter`)
  process.exit(1)
}

const getUpcomingHolidays = async (countryCode: string): Promise<Holiday[]> => {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/nextPublicholidays/${countryCode}`);
    const data = await response.json() as Holiday[];
    return data?.slice(0, 5);
  } catch (error) {
    console.error(error);
    return [];
  }
}

const isValidcountryCode = async (countryCode: string): Promise<CountryCode | undefined> => {
  const response = await fetch(`https://date.nager.at/api/v3/availableCountries`);
  const data = await response.json() as CountryCode[];
  const validCountryCode = data.find(code => code.countryCode === countryCode.toUpperCase());
  return validCountryCode;
}

const formatHolidays = (holidays: Holiday[]) => {

  const formattedHolidays = holidays.map(holiday => {
    return {
      date: holiday.date,
      name: holiday.name,
      counties: holiday.counties, // todo: format counties to show them all
      types: holiday.types?.join(', '),
    }
  });
  return formattedHolidays;
}

async function main() {
  await storage.init({ttl: 10000});
  const fileStorage = await storage.getItem(`data-${options.countryCode}`);
  console.log('fileStorage', fileStorage);
  let res: any;

  if (fileStorage) {
    console.log('es valida');
    res = fileStorage;
  } else {
    console.log('no es valida');
    const validCountryCode = await isValidcountryCode(options.countryCode);
    if(!validCountryCode) {
      console.error(`"${options.countryCode}" is not a valid country code`);
      process.exit(1);
    } else {
      const response = await getUpcomingHolidays(options.countryCode);
      res = await formatHolidays(response);
      await storage.setItem(`data-${options.countryCode}`, res);
    }
    console.table(res);
  }
}

main();

