enum VehicleCondition {
  NEW = "new",
  USED = "used",
  CERTIFIED_PRE_OWNED = "certified_pre_owned",
}

enum FuelType {
  GASOLINE = "gasoline",
  DIESEL = "diesel",
  ELECTRIC = "electric",
  HYBRID = "hybrid",
}

type UserPreferences = {
  vehicle_condition: VehicleCondition[];
  fuel_type: FuelType[];
  vehicle_year: number[];
};

interface User {
  id: string;
  name: string;
  password: string;
  birthday: string;
  user_specific: {
    income: number;
    credit_score: number;
  };
  preferences?: UserPreferences;
}

export { type User, type UserPreferences, FuelType };
