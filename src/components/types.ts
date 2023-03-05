export type Reservation = {
  stay: {
    arrivalDate: string;
    departureDate: string;
  };
  room: {
    roomSize: string;
    roomQuantity: number;
  };
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressStreet: {
    streetName: string;
    streetNumber: string;
  };
  addressLocation?: {
    zipCode: string;
    state: string;
    city: string;
  };
  extras?: string[];
  payment?: string;
  note?: string;
  tags?: string[];
  reminder?: boolean;
  newsletter?: boolean;
  confirm?: boolean;
};

export type ReservationApi = {
  id: number;
  arrival_date: string;
  departure_date: string;
  room_size: string;
  room_quantity: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street_name: string;
  street_number: string;
  zip_code: string;
  state: string;
  city: string;
  extras: string[];
  payment: string;
  note: string;
  tags: string[];
  reminder: boolean;
  newsletter: boolean;
  confirm: boolean;
}
