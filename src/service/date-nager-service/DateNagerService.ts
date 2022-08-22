import fetch from 'node-fetch';
import { CountryCode, Holiday, IDateNagerService } from '../../types.js';

export class DateNagerService implements IDateNagerService {
  private readonly amountOfResults;
  protected baseUrl;

  constructor() {
    this.baseUrl = 'https://date.nager.at/api/v3';
    this.amountOfResults = 5;
  }

  public async getUpcomingHolidays(countryCode: string): Promise<Holiday[]> {
    try {
      const response = await fetch(`${this.baseUrl}/nextPublicholidays/${countryCode}`);
      const data = await response.json() as Holiday[];
      return data?.slice(0, this.amountOfResults);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async isValidcountryCode(countryCode: string): Promise<CountryCode | undefined> {
    const response = await fetch(`${this.baseUrl}/availableCountries`);
    const data = await response.json() as CountryCode[];
    const validCountryCode = data.find(code => code.countryCode === countryCode.toUpperCase());
    return validCountryCode;
  }
}
