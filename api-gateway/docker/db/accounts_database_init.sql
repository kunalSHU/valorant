CREATE TABLE accounts_tbl(
  account_id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(64) NOT NULL,
  last_name VARCHAR(64) NOT NULL, 
  email_address VARCHAR(256) NOT NULL UNIQUE,
  password_hash VARCHAR(512) NOT NULL,
  password_salt VARCHAR(128) NOT NULL,
  account_created_time_utc TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tokens_tbl(
  token_id BIGSERIAL PRIMARY KEY,
  account_id BIGSERIAL NOT NULL REFERENCES accounts_tbl(account_id),
  jwt_token VARCHAR(1024) NOT NULL UNIQUE,
  token_created_time_utc TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE permissions_tbl(
  permission_id BIGSERIAL PRIMARY KEY,
  account_id BIGSERIAL NOT NULL REFERENCES accounts_tbl(account_id),
  account_type_admin BOOLEAN DEFAULT false,
  account_type_doctor BOOLEAN DEFAULT false,
  account_type_receptionist BOOLEAN DEFAULT false,
  account_type_patient BOOLEAN DEFAULT false
);

INSERT INTO accounts_tbl(first_name, last_name, email_address, password_hash, password_salt) VALUES(
  'Shabaz',
  'Badshah',
  'badshah.shabaz@email.com',
  '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C',
  '$2b$08$pLI.wYnpOPD0hsYmAqlh..'
);