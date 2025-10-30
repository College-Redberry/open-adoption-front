export interface PetProps {
  name: string;
  breed: string;
  description: string;
  age: string;
  gender: string;
  is_adopted: boolean;
  images?: string[];
}

export interface Pet extends PetProps {
  id: string;
}
