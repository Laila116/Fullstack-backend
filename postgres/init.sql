CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    birthday DATE,
    balance DECIMAL(10, 2) DEFAULT 0,
    role VARCHAR(50) NOT NULL,
    "companyName" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "addressUser" (
    "addresseId" SERIAL PRIMARY KEY,
    useremail VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    "houseNumber" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "eventCosts" (
    "eventID" VARCHAR(24) NOT NULL, 
    "ticketCost" DECIMAL(10, 2) NOT NULL,
    "ticketBeschreibung" VARCHAR(100) NOT NULL,
    "maxTickets" INT,
    "verfuegbarTickets" INT,
    PRIMARY KEY ("eventID", "ticketBeschreibung")
);

CREATE TABLE IF NOT EXISTS booking (
    "bookingID" SERIAL PRIMARY KEY,
    useremail VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,
    "eventID" VARCHAR(24) NOT NULL,
    "numberOfTickets" INT NOT NULL,
    "totalPrice" DECIMAL(10, 2) NOT NULL,
    "bookingDate" DATE NOT NULL
);

INSERT INTO users (email, password, firstname, surname, phone, birthday, balance, role, "companyName") VALUES
('veranstalter1@example.com', 'password123', 'Max', 'Mustermann', '1234567890', '1980-01-01', 100.00, 'Veranstalter', 'musa' ),
('veranstalter2@example.com', 'password123', 'Anna', 'Müller', '0987654321', '1985-02-15', 150.00, 'Veranstalter', 'musa2'),
('veranstalter3@example.com', 'password123', 'Peter', 'Schmidt', '1122334455', '1990-03-30', 200.00, 'Veranstalter', 'musa2'),
('user1@example.com', 'password123', 'John', 'Doe', '1234567890', '1995-06-15', 50.00, 'User','musa2'),
('user2@example.com', 'password123', 'Jane', 'Doe', '0987654321', '1997-07-20', 75.00, 'User', ''),
('user3@example.com', 'password123', 'Maximilian', 'Meier', '1122334455', '1999-08-10', 60.00, 'User', 'musa2');

-- Adressen für Benutzer hinzufügen
INSERT INTO "addressUser" (useremail, street, city, postcode, "houseNumber") VALUES
('user1@example.com', 'Musterstraße 1', 'Berlin', '10115', 'Germany'),
('user1@example.com', 'Beispielallee 12', 'Munich', '80331', 'Germany'),
('user2@example.com', 'Hauptstraße 45', 'Hamburg', '20095', 'Germany'),
('user3@example.com', 'Bahnhofstraße 78', 'Cologne', '50667', 'Germany'),
('veranstalter1@example.com', 'Industriestraße 90', 'Stuttgart', '70173', 'Germany');

-- EventKosten für jedes Event (Standard, Premium, VIP)
INSERT INTO "eventCosts" ("eventID", "ticketCost", "ticketBeschreibung", "maxTickets", "verfuegbarTickets") VALUES
('677eb60dc60aeba563e9496a', 20.00, 'Standard', 200, 200), 
('677eb60dc60aeba563e9496a', 50.00, 'Premium', 100, 100), 
('677eb60dc60aeba563e9496a', 100.00, 'VIP', 50, 50), 

('677eb60dc60aeba563e9496b', 18.00, 'Standard', 200, 200), 
('677eb60dc60aeba563e9496b', 40.00, 'Premium', 100, 100), 
('677eb60dc60aeba563e9496b', 90.00, 'VIP', 50, 50), 

('677eb60dc60aeba563e9496c', 150.00, 'Standard', 300, 300), 
('677eb60dc60aeba563e9496c', 250.00, 'Premium', 150, 150), 
('677eb60dc60aeba563e9496c', 500.00, 'VIP', 50, 50), 

('677eb60dc60aeba563e9496d', 100.00, 'Standard', 100, 100), 
('677eb60dc60aeba563e9496d', 200.00, 'Premium', 50, 50), 
('677eb60dc60aeba563e9496d', 400.00, 'VIP', 25, 25), 

('677eb60dc60aeba563e9496e', 10.00, 'Standard', 150, 150), 
('677eb60dc60aeba563e9496e', 30.00, 'Premium', 75, 75), 
('677eb60dc60aeba563e9496e', 60.00, 'VIP', 30, 30), 

('677eb60dc60aeba563e9496f', 5.00, 'Standard', 500, 500), 
('677eb60dc60aeba563e9496f', 15.00, 'Premium', 200, 200), 
('677eb60dc60aeba563e9496f', 35.00, 'VIP', 100, 100);

-- Buchungen für User
INSERT INTO booking (useremail, "eventID", "numberOfTickets", "totalPrice", "bookingDate") VALUES
('user1@example.com', '677eb60dc60aeba563e9496a', 2, 40.00, '2025-01-01'),
('user1@example.com', '677eb60dc60aeba563e9496b', 1, 150.00, '2025-02-10'),
('user2@example.com', '677eb60dc60aeba563e9496c', 3, 120.00, '2025-01-15'),
('user2@example.com', '677eb60dc60aeba563e9496d', 1, 10.00, '2025-02-20'),
('user3@example.com', '677eb60dc60aeba563e9496e', 2, 200.00, '2025-03-05'),
('user3@example.com', '677eb60dc60aeba563e9496f', 3, 45.00, '2025-03-25');