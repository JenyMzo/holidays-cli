import { Holiday, HolidayStorage } from '../../types.js';
import storage from 'node-persist';

export class PersistDataService {
  private readonly ttl = 1000 * 60 * 60 * 24;

  public async init(): Promise<void> {
    await storage.init({
      dir: './data',
      ttl: this.ttl,
    });
  }

  public async getData(countryCode: string): Promise<Pick<HolidayStorage, "date" | "name" | "counties" | "types">[] | undefined> {
    try {
      const fileStorage = await storage.getItem(`data-${countryCode}`);
      return fileStorage;
    } catch (error) {
      console.error(error);
    }
  }

  public async setData(countryCode: string, data: Pick<HolidayStorage, "date" | "name" | "counties" | "types">[] | undefined): Promise<void> {
    try {
      await storage.setItem(`data-${countryCode}`, data);
    } catch (error) {
      console.error(error);
    }
  }
}


// await storage.init({ttl: 10000});
//   const fileStorage = await storage.getItem(`data-${options.countryCode}`);
//   console.log('fileStorage', fileStorage);
//   let res: any;

//   if (fileStorage) {
//     console.log('es valida');
//     res = fileStorage;
//   } else {
//     console.log('no es valida');
//     const validCountryCode = await isValidcountryCode(options.countryCode);
//     if(!validCountryCode) {
//       console.error(`"${options.countryCode}" is not a valid country code`);
//       process.exit(1);
//     } else {
//       const response = await getUpcomingHolidays(options.countryCode);
//       res = await formatHolidays(response);
//       await storage.setItem(`data-${options.countryCode}`, res);
//     }
//     console.table(res);
