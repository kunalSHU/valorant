
CREATE TABLE accounts_tbl(
  account_id BIGSERIAL PRIMARY KEY,
  email_address VARCHAR(256) NOT NULL UNIQUE,
  password_hash VARCHAR(512) NOT NULL,
  password_salt VARCHAR(128) NOT NULL,
  account_created_time_utc TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tokens_tbl(
  token_id BIGSERIAL PRIMARY KEY,
  account_id BIGSERIAL NOT NULL REFERENCES accounts_tbl(account_id) ON DELETE CASCADE,
  jwt_token VARCHAR(1024) NOT NULL UNIQUE,
  token_created_time_utc TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE ROLE_TYPE as enum('admin', 'doctor', 'receptionist', 'patient');

CREATE TABLE permissions_tbl(
  permission_id BIGSERIAL PRIMARY KEY,
  account_id BIGSERIAL NOT NULL UNIQUE REFERENCES accounts_tbl(account_id) ON DELETE CASCADE,
  account_role ROLE_TYPE NOT NULL DEFAULT 'patient'
);


-- Doctor Account
INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES(
  'doctor@email.com',
  '$2b$08$nX/R4AK07HIyV7FjXkrLlel.wWDNE0TGaf5tzCGPEfU2La/.AdyjC',
  '$2b$08$nX/R4AK07HIyV7FjXkrLle'
) RETURNING account_id;

INSERT INTO tokens_tbl(account_id, jwt_token) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='doctor@email.com'),
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5ODA3MTk0MzIyOCwiaWF0IjoxNTk4MDcxOTQzLCJleHAiOjE2MDE2NzE5NDN9.yGpDLkkBJ8U5KKeYs5R4Wt0vh-CoX7_aNZsP1thAfO4');

INSERT INTO permissions_tbl(account_id, account_role) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='doctor@email.com'), 
  'doctor');


-- Patient Account
INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES(
  'patient@email.com',
  '$2b$08$b/epqc/kykUDVKwJ8NQ5cuW32kS72MXjqBgSLFIB5b9/LuRXW8Kja',
  '$2b$08$b/epqc/kykUDVKwJ8NQ5cu'
) RETURNING account_id;

INSERT INTO tokens_tbl(account_id, jwt_token) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='patient@email.com'),
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5ODA3MTQ1NDE1NSwiaWF0IjoxNTk4MDcxNDU0LCJleHAiOjE2MDE2NzE0NTR9.Ogn0AYCcOp5OWI3hVG7qTQTwVvkt8TK-ryXUP2nLWb0');

INSERT INTO permissions_tbl(account_id, account_role) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='patient@email.com'), 
  'patient');


-- Receptionist Account
INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES(
  'receptionist@email.com',
  '$2b$08$noGebGJQJGEuMQQKwwURfOSUc/StK9W0c7bCOeLtV.S9kE0HCSzfi',
  '$2b$08$noGebGJQJGEuMQQKwwURfO'
) RETURNING account_id;

INSERT INTO tokens_tbl(account_id, jwt_token) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='receptionist@email.com'),
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5ODA3MTcyNzM1MywiaWF0IjoxNTk4MDcxNzI3LCJleHAiOjE2MDE2NzE3Mjd9.9_RkSTwkmnUod6KRtj325bMljx3sYbn89ie2PalKG2Y');

INSERT INTO permissions_tbl(account_id, account_role) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='receptionist@email.com'), 
  'receptionist');