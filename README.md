## EventureProjekt

Eine Webanwendung die Veranstaltungen erstellt, kauft und verkauft.
Modul: 151-Fullstack

von 

Laila Almejbel 679162 <br>
Zübeyde Dogan 679407 <br>
Musa Albayrak 678975 <br>

# Docker
in backend repository: <br>
- docker-compose up

# Submodule installieren
in BE: <br>
cd .\backend\backend\ <br>
git submodule init <br>
git submodule update --remote <br>

in FE <br>
cd .\frontend\ <br>
git submodule init <br>
git submodule update --remote <br>

# Docker start manuell
- docker-compose up postgresdb
- docker-compose up mongodb
- docker-compose up frontend-1
- docker-compose up backend-1

# Test Frontend
Component: BookingsService <br>
Framework: Angular mit Jasmine <br>
Testausführung:<br>
ng test

# Ergebnis
- should return expected bookings (HttpClient called once)
- should be created
- should handle error response from server

# Test Backnend
npm run test

# Login
Testuser <br>
Email: user1@example.com <br>
Passwort: password123

Testveranstalter <br>
Email: veranstalter1@example.com <br>
Passwort: password123