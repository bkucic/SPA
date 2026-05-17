CREATE TABLE MOTOR
(
  Naziv VARCHAR(20) NOT NULL,
  Volumen INT NOT NULL,
  Broj_cilindara INT NOT NULL,
  Konfiguracija VARCHAR(20) NOT NULL,
  Sifra SERIAL PRIMARY KEY
);

CREATE TABLE GUMA
(
  Naziv VARCHAR(20) NOT NULL,
  Sirina INT NOT NULL,
  Omjer_visine_i_sirine FLOAT NOT NULL,
  Struktura VARCHAR(5) NOT NULL,
  Velicina_kotaca INT NOT NULL,
  Sifra SERIAL PRIMARY KEY
);

CREATE TABLE MARKA
(
  Sifra SERIAL PRIMARY KEY,
  Naziv VARCHAR(20) NOT NULL
);

CREATE TABLE VOZILO
(
  Sifra SERIAL PRIMARY KEY,
  Naziv VARCHAR(20) NOT NULL,
  Boja VARCHAR(20) NOT NULL,
  Oblik VARCHAR(20) NOT NULL,
  Motor_sifra INT NOT NULL,
  Guma_sifra INT NOT NULL,
  Marka_sifra INT NOT NULL,
  FOREIGN KEY (Motor_sifra) REFERENCES MOTOR(Sifra),
  FOREIGN KEY (Guma_sifra) REFERENCES GUMA(Sifra),
  FOREIGN KEY (Marka_sifra) REFERENCES MARKA(Sifra)
);

CREATE TABLE KUPAC
(
  OIB VARCHAR(11) NOT NULL,
  Ime VARCHAR(20) NOT NULL,
  Prezime VARCHAR(20) NOT NULL,
  Adresa VARCHAR(50) NOT NULL,
  PRIMARY KEY (OIB)
);

CREATE TABLE REZERVACIJA
(
  Sifra SERIAL PRIMARY KEY,
  Datum DATE NOT NULL,
  Vozilo_sifra INT NOT NULL,
  Kupac_OIB VARCHAR(11) NOT NULL,
  FOREIGN KEY (Vozilo_sifra) REFERENCES VOZILO(Sifra),
  FOREIGN KEY (Kupac_OIB) REFERENCES KUPAC(OIB)
);

CREATE TABLE ADMINISTRATOR
(
  Korisnicko_ime VARCHAR(60) NOT NULL,
  Lozinka VARCHAR(60) NOT NULL,
  PRIMARY KEY (Korisnicko_ime)
);
CREATE TABLE TIP_SERVISA
(
  Sifra SERIAL PRIMARY KEY,
  Naziv VARCHAR(20) NOT NULL
);
CREATE TABLE SERVIS
(
  Sifra SERIAL PRIMARY KEY,
  Datum DATE NOT NULL,
  Vozilo_sifra INT NOT NULL,
  Tip_servisa_sifra INT NOT NULL,
  FOREIGN KEY (Vozilo_sifra) REFERENCES VOZILO(Sifra),
  FOREIGN KEY (Tip_servisa_sifra) REFERENCES TIP_SERVISA(Sifra)
);
INSERT INTO MARKA (Naziv) VALUES
('BMW'), ('Audi'), ('Toyota'), ('Mercedes'),
('Volkswagen'), ('Ford'), ('Honda'),
('Hyundai'), ('Kia'), ('Peugeot');

INSERT INTO MOTOR (Naziv, Volumen, Broj_cilindara, Konfiguracija) VALUES
('B48',2000,4,'Inline'),
('V6 TDI',3000,6,'V'),
('Hybrid',1800,4,'Inline'),
('V8',4000,8,'V'),
('EcoBoost',1500,3,'Inline'),
('i-VTEC',2000,4,'Inline'),
('CRDi',1600,4,'Inline'),
('GDI',2000,4,'Inline'),
('TSI',1400,4,'Inline'),
('PureTech',1200,3,'Inline');

INSERT INTO GUMA (Naziv, Sirina, Omjer_visine_i_sirine, Struktura, Velicina_kotaca) VALUES
('Michelin Pilot',225,0.45,'R',17),
('Pirelli P Zero',245,0.40,'R',18),
('Continental Eco',205,0.55,'R',16),
('Goodyear Eagle',235,0.45,'R',17),
('Dunlop Sport',255,0.35,'R',19),
('Bridgestone Turanza',215,0.55,'R',16),
('Hankook Ventus',225,0.50,'R',17),
('Yokohama Blue',205,0.60,'R',15),
('Nokian WR',195,0.65,'R',15),
('Toyo Proxes',265,0.30,'R',20);

INSERT INTO VOZILO (Naziv, Boja, Oblik, Motor_sifra, Guma_sifra, Marka_sifra) VALUES
('BMW 3','Crna','Sedan',1,1,1),
('Audi A6','Bijela','Sedan',2,2,2),
('Toyota Prius','Siva','Hatchback',3,3,3),
('Mercedes C','Plava','Sedan',4,4,4),
('VW Golf','Crvena','Hatchback',9,5,5),
('Ford Focus','Zelena','Hatchback',5,6,6),
('Honda Civic','Crna','Sedan',6,7,7),
('Hyundai i30','Bijela','Hatchback',7,8,8),
('Kia Sportage','Siva','SUV',8,9,9),
('Peugeot 308','Plava','Hatchback',10,10,10);

INSERT INTO KUPAC (OIB, Ime, Prezime, Adresa) VALUES
(11111111111,'Ivan','Horvat','Zagreb'),
(22222222222,'Ana','Kovač','Split'),
(33333333333,'Marko','Markić','Rijeka');

INSERT INTO REZERVACIJA (Datum, Vozilo_sifra, Kupac_OIB) VALUES
('2027-06-01',1,'11111111111'),
('2027-06-02',2,'33333333333');

INSERT INTO ADMINISTRATOR (Korisnicko_ime, Lozinka) VALUES
('admin', '$2a$12$AaSW73WYovw6BQE3d69tbe4bmTds0tLVgjR/oVL8aUEmTYCYeyJZC');

INSERT INTO TIP_SERVISA (Naziv) VALUES
('Mali servis'),
('Veliki servis'),
('Zamjena ulja'),
('Zamjena guma'),
('Registracija'),
('Dijagnostika'),
('Pranje vozila'),
('Punjenje klime');

INSERT INTO SERVIS (Datum, Vozilo_sifra, Tip_servisa_sifra) VALUES
('2025-06-01', 1, 1),
('2025-01-01', 1, 5);