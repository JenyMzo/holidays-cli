import { HolidayStorage } from '../../types.js';
import storage from 'node-persist';

const ttl = 1000 * 60 * 60 * 24;

export const init = async ():Promise<void> => {
  await storage.init({
    dir: './data',
    ttl,
  });
}

export const getData = async(countryCode: string): Promise<Pick<HolidayStorage, "date" | "name" | "counties" | "types">[] | undefined> => {
  try {
    const fileStorage = await storage.getItem(`data-${countryCode}`);
    console.log('ayyy', fileStorage);
    return fileStorage;
  } catch (error) {
    console.error(error);
  }
}

export const setData = async(countryCode: string, data: Pick<HolidayStorage, "date" | "name" | "counties" | "types">[] | undefined): Promise<void> => {
  try {
    await storage.setItem(`data-${countryCode}`, data);
  } catch (error) {
    console.error(error);
  }
}
