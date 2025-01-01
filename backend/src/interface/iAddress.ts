export interface AddressAttributes {
    addresseId?:number;
    /** 
     * Email des Users, als foreign key
     * @example "hans.wurst@example.com"
     */
    useremail: string;

    /** 
     * Stadt der Addresse
     * @example "Berlin"
     */
    city: string;

    /** 
     * Postleitzahl der Addresse
     * @example "10115"
     */
    postcode: string;

    /** 
     * Straße der Addresse
     * @example "Musterstraße"
     */
    street: string;

    /** 
     * Hausnummer der Addresse
     * @example "42"
     */
    houseNumber: string;
}
