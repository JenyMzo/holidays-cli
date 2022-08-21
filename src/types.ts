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

export type CountryCode = {
    countryCode: string;
    name: string;
}

 enum holidayType {
    Public,
    Bank,
    School,
    Authorities,
    Optional,
    Observance
}
