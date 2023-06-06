# APLIKACJA DO ZARZĄDZANIA GRAMI, DEWELOPERAMI I UŻYTKOWNIKAMI

## Wybrane technologie
- TypeScript
- Express
- Prisma (sqlite)
- JWT

## Krótki opis
- Użytkownik może zarządzać grami, deweloperami i użytkownikami poprzez odczytywanie rekordów z bazy danych oraz dodawanie, edytowanie i usuwanie ich do/z bazy danych. W celu dodania lub edycji gry należy również podać id dewelopera.
- Do modyfikowania danych (oprócz dodawania nowego użytkownika) wymagana jest autentykacja / autoryzacja. Najpierw należy przejść do requesta `POST Login User` i podać właściwy id, username i password. Wygenerowany token jest ważny przez 2 minuty i jego wartość należy wkleić do header-ów Authorization po słowie `Bearer`. 

## Komendy
- Instalacja project dependencies: `npm install`
- Utworzenie pliku bazy danych dev.db: `npx prisma db push`
- Dodanie domyślnych danych do bazy danych z pliku seed.ts: `npx prisma db seed`
- Uruchomienie aplikacji w trybie deweloperskim: `npm run dev`
- Import zależności dev: `npm i --save-dev typescript supertest nodemon jest ts-jest ts-node @types/jest @types/supertest @types/express`
- Dodanie frameworka Jest do projektu: `npx ts-jest config:init`
- Uruchomienie testów `npm run test`