export interface RequestProps {
  pet_id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  house_hold_agreed: boolean;
  already_pets: number;
  already_pets_castrated_and_vaccinated: boolean;
  property: string;
  own_property: boolean;
  address: string;
  income: number;
  suitable_location: string;
  access_to_the_street?: boolean;
  approved_at?: string;
}

export interface Request extends RequestProps {
  id: string;
}
