-- Erstelle die Tabelle Users, falls sie nicht bereits existiert
/*CREATE TABLE IF NOT EXISTS "Users" (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    firstName VARCHAR(100),
    surName VARCHAR(100),
    phone VARCHAR(50),
    birthday VARCHAR(50),
    balance DECIMAL(10, 2)
);

-- Füge einen Beispiel-Nutzer in die Tabelle ein
INSERT INTO Users (
    customerId, 
    firstName, 
    surName, 
    phone, 
    birthday, 
    email, 
    password, 
    balance
) 
VALUES (
    12345, 
    'Hans', 
    'Wurst', 
    '+49 170 1234567', 
    '1990-12-31', 
    'hans.wurst@example.com', 
    's3cr3tP@ssw0rd!', 
    420.69
);
*/