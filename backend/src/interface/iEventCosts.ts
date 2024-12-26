export interface iEventCosts {
    eventID: number;
    ticketCost: number;
    eventName: string;
}

export interface iEventCostsCreationAttributes extends Partial<Pick<iEventCosts, 'eventName'>> {
    eventID: number;
    ticketCost: number;
}