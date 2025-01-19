## EventureProjekt

Eine Webanwendung die Veranstaltungen erstellt, kauft und verkauft.
Modul: 151-Fullstack

von 

Laila Almejbel 679162
Zübeyde Dogan 679407
Musa Albayrak 678975

# Docker
- docker-compose up

# Docker start manuell
- docker-compose up postgresdb
- docker-compose up mongodb
- docker-compose up frontend-1
- docker-compose up backend-1

# Test Frontend
Component: BookingsService
Framework: Angular mit Jasmine
Testausführung:
ng test

# Ergebnis
- should return expected bookings (HttpClient called once)
- should be created
- should handle error response from server

# Test Backnend
npm run test

# Login
Testuser
Email: user1@example.com
Passwort: password123

Testveranstalter
Email: veranstalter1@example.com
Passwort: password123