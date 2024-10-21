export interface Address {
    streetNumber: number;
    streetName: string;
    city: string;
    postCode: string;
    country: string;
  };

export interface User {
  _id: string 
  firstName: string ;
  lastName: string 
  email: string 
  membership: string 
  address: Address | null;
  role: string 
  profilePic: string 
  is_activated: boolean 

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
  