 \connect accounts_db;
DROP SCHEMA IF EXISTS ACCOUNTS_INFO CASCADE;
CREATE SCHEMA ACCOUNTS_INFO;
SET search_path TO ACCOUNTS_INFO;

/*
* D - Docter  ... U - User/Patient  ... A - Admin
*/
CREATE TABLE accounts_tbl ( 
    user_name   VARCHAR     NOT NULL PRIMARY KEY,
    password    VARCHAR     NOT NULL,
    user_type   CHAR        NOT NULL,
    CONSTRAINT chk_user_type CHECK (user_type IN ('D', 'U', 'A'))
);
