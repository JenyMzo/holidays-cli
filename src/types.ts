export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[] | null;
}

type Modify<T, R> = Omit<T, keyof R> & R;

type HolidayModified = Modify<Holiday,{
  types: string | undefined;
}>;

export type HolidayStorage = Pick<HolidayModified, 'date' | 'name' | 'counties' | 'types'>

export type CountryCode = {
  countryCode: string;
  name: string;
}
