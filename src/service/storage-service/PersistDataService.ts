import { HolidayStorage } from '../../types.js';
import storage from 'node-persist';
import { ttl } from './../../constants.js'
export const init = async ():Promise<void> => {
  await storage.init({
    dir: './data',
    ttl,
  });
}

export const getData = async(countryCode: string): Promise<HolidayStorage[] | undefined> => {
  try {
    const fileStorage = await storage.getItem(`data-${countryCode}`);
    return fileStorage;
  } catch (error) {
    console.error(error);
  }
}

export const setData = async(countryCode: string, data: HolidayStorage[] | undefined): Promise<void> => {
  try {
    await storage.setItem(`data-${countryCode}`, data);
  } catch (error) {
    console.error(error);
  }
}

export const clearData = async(countryCode: string): Promise<void> => {
  try {
    await storage.removeItem(`data-${countryCode}`);
  } catch (error) {
    console.error(error);
  }
}
