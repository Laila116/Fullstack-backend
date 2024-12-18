export interface UserData {
    /** 
    * E-Mail-Addresse des Benutzers
    * @example "hans.wurst@example.com"
    */
    email: string;

    /** 
     * Passwort des Benutzers (gesichert)
     * @example "s3cr3tP@ssw0rd!"
     */
    password: string;

    /** 
     * Vorname des Benutzers
     * @example "Hans"
     */
    firstname: string;

    /** 
     * Nachname des Benutzers
     * @example "Wurst"
     */
    surname: string;

    /** 
     * Telefonnummer des Benutzers
     * @example "+49 170 1234567"
     */
    phone: string;

    /** 
     * Geburtsdatum des Benutzers
     *  "1990-12-31"
     */
    birthday: Date;

    /** 
     * Aktuelles Guthaben des Benutzers (Saldo)
     * @example 420.69
     */
    balance: number;
}

export interface AddressAttributes {
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
