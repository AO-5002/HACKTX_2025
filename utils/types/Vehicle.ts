import { FuelType } from "./User";

enum Vehicle_Condition {
  NEW = "New",
  USED = "Used",
}

enum Vehicle_Trim {
  BASE = "Base",
  SPORT = "Sport",
  LUXURY = "Luxury",
}

interface Vehicle_Details {
  vehicle_condition: Vehicle_Condition;
  fuel_type: FuelType;
  msrp: number;
  vehicle_year: number;
  vehicle_model: string;
  vehicle_trim: Vehicle_Trim;
  mileage: number;
}

export { type Vehicle_Details };
