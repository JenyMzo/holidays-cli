import minimist from 'minimist';
import storage from 'node-persist';
import 'reflect-metadata';
import { PersistDataService } from './service/storage-service/PersistDataService.js';
import { DateNagerService } from './service/date-nager-service/DateNagerService.js';
import { SanitizeHolidays } from './business/sanitizeHolidays/SanitizeHolidays.js';
import { HolidayStorage } from './types.js';

const options = minimist(process.argv.slice(2));

if (!options.countryCode) {
  console.error(`Please enter the country code using the '--countryCode=' parameter`)
  process.exit(1)
}

async function start(): Promise<void> {
  const persistDataService = new PersistDataService();

  await persistDataService.init();
  const fileStorage = await persistDataService.getData(options.countryCode);

  let res: Pick<HolidayStorage, 'date' | 'name' | 'counties' | 'types'>[] = [];

  if (fileStorage) {
    res = fileStorage;
  } else {
    const dateNagerService = new DateNagerService();
    const validCountryCode = await dateNagerService.isValidcountryCode(options.countryCode);

    if(!validCountryCode) {
      console.error(`"${options.countryCode}" is not a valid country code`);
      process.exit(1);
    } else {
      const response = await dateNagerService.getUpcomingHolidays(options.countryCode);
      const sanitizeHolidays = new SanitizeHolidays();

      res = await sanitizeHolidays.formatHolidays(response);
      await persistDataService.setData(options.countryCode, res);
    }
  }
  console.table(res);
}

start().catch((err) => {
  console.error(`Error starting server: ${err.message}`, err);
  process.exit(-1);
});

