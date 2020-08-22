
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


-- Doctor
INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES(
  'doctor@email.com',
  '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C',
  '$2b$08$pLI.wYnpOPD0hsYmAqlh..'
) RETURNING account_id;

INSERT INTO tokens_tbl(account_id, jwt_token) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='doctor@email.com'),
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5NjAyMzY5MDYyMSwiaWF0IjoxNTk2MDIzNjkwLCJleHAiOjE1OTk2MjM2OTB9.GLU7TAMYszrpOy9arXIXTe8B8OcGPpKC0Shd-ydohqQ');

INSERT INTO permissions_tbl(account_id, account_role) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='doctor@email.com'), 
  'doctor');


-- Patient User
INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES(
  'badshah.shabaz@email.com',
  '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C',
  '$2b$08$pLI.wYnpOPD0hsYmAqlh..'
) RETURNING account_id;

INSERT INTO tokens_tbl(account_id, jwt_token) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='badshah.shabaz@email.com'),
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5NjAyMzY5MDYyMSwiaWF0IjoxNTk2MDIzNjkwLCJleHAiOjE1OTk2MjM2OTB9.GLU7TAMYszrpOy9arXIXTe8B8OcGPpKC0Shd-ydohqQ');

INSERT INTO permissions_tbl(account_id, account_role) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='badshah.shabaz@email.com'), 
  'patient');


-- Receptionist
INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES(
  'receptionist@email.com',
  '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C',
  '$2b$08$pLI.wYnpOPD0hsYmAqlh..'
) RETURNING account_id;

INSERT INTO tokens_tbl(account_id, jwt_token) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='receptionist@email.com'),
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5NjAyMzY5MDYyMSwiaWF0IjoxNTk2MDIzNjkwLCJleHAiOjE1OTk2MjM2OTB9.GLU7TAMYszrpOy9arXIXTe8B8OcGPpKC0Shd-ydohqQ');

INSERT INTO permissions_tbl(account_id, account_role) VALUES (
  (SELECT account_id FROM accounts_tbl WHERE email_address='receptionist@email.com'), 
  'receptionist');