#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import minimist from 'minimist';

import { getData, setData, init } from './service/storage-service/PersistDataService.js';
import { getUpcomingHolidays, isValidcountryCode } from './service/date-nager-service/DateNagerService.js';
import { formatHolidays } from './business/sanitizeHolidays/SanitizeHolidays.js';
import { HolidayStorage } from './types.js';

const options = minimist(process.argv.slice(2));

clear();
console.log(
  chalk.green(
    figlet.textSync('Holidays-cli', { horizontalLayout: 'full' })
  )
);

console.log(
  chalk.blue(
    'A CLI that retrieves the next 5 occurring public holidays in a given country.'
  )
);
console.log(
  chalk.blue(
    'Usage: npx upcoming-holidays-cli --countryCode=<code>'
  )
);

if (!options.countryCode) {
  console.error(chalk.red(
    `Please enter the country code using the '--countryCode=' parameter`
    )
  );
  process.exit(1)
}

async function start(): Promise<void> {
  await init();
  const fileStorage = await getData(options.countryCode);

  let res: Pick<HolidayStorage, 'date' | 'name' | 'counties' | 'types'>[] = [];

  if (fileStorage) {
    res = fileStorage;
  } else {
    const validCountryCode = await isValidcountryCode(options.countryCode);

    if(!validCountryCode) {
      console.error(chalk.red(`"${options.countryCode}" is not a valid country code`));
      process.exit(1);
    } else {
      const response = await getUpcomingHolidays(options.countryCode);

      res = await formatHolidays(response);
      await setData(options.countryCode, res);
    }
  }
  console.table(res);
}

start().catch((err) => {
  console.error(`Error starting server: ${err.message}`, err);
  process.exit(-1);
});

