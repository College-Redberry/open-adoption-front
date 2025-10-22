export interface PetProps {
  name: string;
  breed: string;
  age: string;
  gender: string;
  isAdoped: boolean;
}

export interface Pet extends PetProps {
  id: string;
}
