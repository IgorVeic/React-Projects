import { Country } from "./country.interface";

export interface TripPlanItem extends Country {
  days: number;
}

// export interface TripPlanItem {
//   name: {
//     common: string;
//   };
//   flag: string;
//   days: number;
// }

export interface Trip {
  passengerName: string;
  passengerEmail: string;
  budget: number;
  passportNumber: string;
  comments: string;
  countries: TripPlanItem[];
  passportImage?: string;
  insuranceOption?: InsuranceOption;
}

export interface InsuranceOption {
  id: number;
  name: string;
  description: string;
  price: string;
  coverage: string;
}
