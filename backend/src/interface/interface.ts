export interface UserData {
    /** 
     * Primärschlüssel für Benutzer
     * @example 12345
     */
    customerid?: number;
    
    /** 
     * Vorname des Benutzers
     * @example "Hans"
     */
    firstname?: string;
    
    /** 
     * Nachname des Benutzers
     * @example "Wurst"
     */
    surname?: string;
    
    /** 
     * Telefonnummer des Benutzers
     * @example "+49 170 1234567"
     */
    phone?: string;
    
    /** 
     * Geburtsdatum des Benutzers
     * @example "1990-12-31"
     */
    birthday?: string;
    
    /** 
     * E-Mail-Adresse des Benutzers
     * @example "hans.wurst@example.com"
     */
    email?: string;
    
    /** 
     * Passwort des Benutzers (gesichert)
     * @example "s3cr3tP@ssw0rd!"
     */
    password?: string;
    
    /** 
     * Aktuelles Guthaben des Benutzers (Saldo)
     * @example 420.69
     */
    balance?: number;
}
