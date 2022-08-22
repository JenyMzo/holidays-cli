export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: holidayType[] | null;
}

type Modify<T, R> = Omit<T, keyof R> & R;

export type HolidayStorage = Modify<Holiday,{
  types: string | undefined;
}>;

export type CountryCode = {
  countryCode: string;
  name: string;
}

export interface IDateNagerService {
  getUpcomingHolidays(countryCode: string): Promise<Holiday[]>;
  isValidcountryCode(countryCode: string): Promise<CountryCode | undefined>;
}

enum holidayType {
  Public,
  Bank,
  School,
  Authorities,
  Optional,
  Observance
}

