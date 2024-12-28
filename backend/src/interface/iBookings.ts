export interface iBookings {
    bookingID: number; 
    useremail: string; 
    eventID: number;   // (später)
    numberOfTickets: number; 
    totalPrice: number; 
    bookingDate: Date;
}

export interface iBookingCreationAttributes extends Partial<Pick<iBookings, 'bookingID' | 'bookingDate'>> {
    useremail: string;
    eventID: number;
    numberOfTickets: number;
    totalPrice: number;
}