import fetch from 'node-fetch';
import { CountryCode, Holiday } from '../../types.js';
import { amountOfResults } from './../../constants.js'

const baseUrl = 'https://date.nager.at/api/v3';

export const getUpcomingHolidays = async(countryCode: string): Promise<Holiday[]> =>{
  try {
    const response = await fetch(`${baseUrl}/nextPublicholidays/${countryCode}`);
    const data = await response.json() as Holiday[];

    return data?.slice(0, amountOfResults);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getValidcountryCode = async(countryCode: string): Promise<CountryCode | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/availableCountries`);
    const data = await response.json() as CountryCode[];
    const validCountryCode = data.find(code => code.countryCode === countryCode.toUpperCase());

    return validCountryCode;
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

