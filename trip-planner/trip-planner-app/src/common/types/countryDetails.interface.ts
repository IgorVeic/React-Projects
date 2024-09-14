export interface CountryDetails {
  flag: string;
  languages: { [key: string]: string };
  timezones: string[];
  currencies: { [key: string]: { name: string; symbol: string } };
  subregion: string;
  borders: string[];
}
