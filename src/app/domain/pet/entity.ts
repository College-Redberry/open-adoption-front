export interface PetProps {
  name: string;
  breed: string;
  age: string;
  gender: string;
  is_adoped: boolean;
  images?: string[];
}

export interface Pet extends PetProps {
  id: string;
}
