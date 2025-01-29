export interface Reservation {
    id: string;
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    passengers?: Passenger[];
  }
  
  export interface Passenger {
    name: string;
    age: number;
    seatNumber: string;
  }