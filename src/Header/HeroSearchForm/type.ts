export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export type StaySearchFormField = "Type of Care" | "Zip Code" | "Radius"

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}