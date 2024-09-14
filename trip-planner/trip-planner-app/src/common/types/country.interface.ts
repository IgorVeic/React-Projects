export interface Country {
  id: number;
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  area: number;
  flag: string;
  population: number;
  landlocked: boolean;
}
