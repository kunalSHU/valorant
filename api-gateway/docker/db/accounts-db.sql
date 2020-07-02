DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
  accountId BIGSERIAL PRIMARY KEY,
  firstName VARCHAR(64) NOT NULL,
  lastName VARCHAR(64) NOT NULL, 
  emailAddress VARCHAR(256) NOT NULL UNIQUE,
  passwordHash VARCHAR(512) NOT NULL,
  jwtToken VARCHAR(1024),
  tokenCreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO accounts (firstName, lastName, emailAddress, passwordHash, jwtToken) VALUES ('Shabaz', 'Badshah', 'badshah.shabaz@gmail.com', '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5MzY1MDM1MDg5OSwiaWF0IjoxNTkzNjUwMzUwLCJleHAiOjE1OTcyNTAzNTB9.YAbwOx8_MZih8anALlaRLSWj1AhiRjlOz30S8r7nZPQ');

INSERT INTO accounts (firstName, lastName, emailAddress, passwordHash, jwtToken) VALUES ('Kunal', 'Shukla', 'kunal.shukla@gmail.com', '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5MzY2NzA1OTAxOCwiaWF0IjoxNTkzNjY3MDU5LCJleHAiOjE1OTcyNjcwNTl9.8-8YUMTLxpvk_g73w-UEWDs294skfS4oiWd2KWyaU4Y');

INSERT INTO accounts (firstName, lastName, emailAddress, passwordHash, jwtToken) VALUES ('Swetha', 'Maramganty', 'swetha.maramganty@gmail.com', '$2b$08$f8v.elIjKkbBdeBvCKX66ej/svbBcexo28.gfplFH8K4hyKtFkM0C', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyRGF0ZSI6MTU5MzY1MDM1MDg5OSwiaWF0IjoxNTkzNjUwMzUwLCJleHAiOjE1OTcyNTAzNTB9.YAbwOx8_MZih8anALlaRLSWj1AhiRjlOz30S8r7nZPQ');