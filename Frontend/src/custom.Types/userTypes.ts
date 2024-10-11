export interface Address {
    streetNumber: number;
    streetName: string;
    city: string;
    postCode: string;
    country: string;
  };

export interface User {
  _id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  membership: string | null;
  address: Address | null;
  role: string | null;
  profilePic: string | null;
}
  export interface Member {
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    membership: 'Basic' | 'Standard' | 'Premium' | 'Staff';
    role: 'Member' | 'Admin';
    is_activated: boolean;
    _id: string;
  }
  