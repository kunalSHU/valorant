 \connect patient_db;
DROP SCHEMA IF EXISTS PATIENT_INFO CASCADE;
CREATE SCHEMA PATIENT_INFO;
SET search_path TO PATIENT_INFO;

CREATE TABLE address_info_tbl(
	    addressid      INTEGER     NOT NULL PRIMARY KEY,
	    streetname     VARCHAR     NOT NULL,
	    city           VARCHAR     NOT NULL,
	    postal_code    VARCHAR     NOT NULL,
	    province       VARCHAR     NOT NULL,
	    country        VARCHAR     NOT NULL,
	    otherdetails   VARCHAR
);

CREATE TABLE patient_basic_info_tbl(
    userid         INTEGER     NOT NULL PRIMARY KEY,
    addressid      INTEGER     NOT NULL,
    username       VARCHAR     NOT NULL,
    first_name     VARCHAR     NOT NULL,
    last_name      VARCHAR     NOT NULL,
    phone_number   INTEGER     NOT NULL,
    email          VARCHAR     NOT NULL,
    birthdate      DATE        NOT NULL,
    date_became_patient DATE   NOT NULL,
    gender         TEXT     NOT NULL,
    FOREIGN KEY (addressid) REFERENCES address_info_tbl(addressid)
);
