# Sustav za prodaju automobila

Za instalaciju sustava potrebno je:
- u terminalu pozicionirati se u direktorij SPA i pokrenuti naredbu "npm install"
- napraviti .env file koji sadrži varijable okruženja DB, koji predstavlja podatke za povezivanje na PostgreSQL bazu u obliku linka, i SESSION_SECRET, nasumično generirani string koji se koristi za generiranje korisničkih sjednica.  
(primjeri:  
DB=postgres://postgres:password@localhost:5432/SPA  
SESSION_SECRET=0a639c7244c48326afa4c41cfd8996f4e34b617d6a4c06bdd6764376e0b1a99901dc9be72d6c47f70a272ebee7a775643349f308a5ea18f99f5d4965ffcabc8b)

Za pokretanje servera na web adresi localhost:3000 potrebno je u terminalu pozicionirati se u direktorij SPA i pokrenuti naredbu "node --env-file=.env app.js".

Za pokretanje testova potrebno je pokrenuti naredbu "npm test".
