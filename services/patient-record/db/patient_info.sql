 \connect patient_db;
DROP SCHEMA IF EXISTS PATIENT_INFO CASCADE;
CREATE SCHEMA PATIENT_INFO;
SET search_path TO PATIENT_INFO;

CREATE TABLE address_info_tbl( 
	    addressid      INTEGER     NOT NULL PRIMARY KEY,
	    streetname     VARCHAR     NOT NULL,
	    city           VARCHAR     NOT NULL,
	    postal_code    VARCHAR     NOT NULL,
	    province       VARCHAR     NOT NULL
);

CREATE TABLE patient_basic_info_tbl(
    userid         INTEGER     NOT NULL PRIMARY KEY,
    addressid      INTEGER     NOT NULL,
    first_name     VARCHAR     NOT NULL,
    last_name      VARCHAR     NOT NULL,
    phone_number   VARCHAR     NOT NULL,
    email          VARCHAR     NOT NULL,
    birthdate      DATE        NOT NULL,
    date_became_patient DATE   NOT NULL,
    sex         TEXT     NOT NULL,
    FOREIGN KEY (addressid) REFERENCES address_info_tbl(addressid)
);
INSERT INTO address_info_tbl VALUES (
            1, 'DisneyLand', 'Idk', 'idk', 'somewhereinamerica'
);

INSERT INTO address_info_tbl VALUES (
            2, 'WhiteHouses', 'trump', 'donald', 'huuuugee'
);

INSERT INTO patient_basic_info_tbl VALUES (
    1, 1, 'Swetha', 'Maramganty', 0000000000, 'ahah@gmail.com', '04-12-1997', '06-30-2020', 'F'
);

INSERT INTO patient_basic_info_tbl VALUES (
    2, 2, 'Kunal', 'Shukla', 0000000000, 'kunkun@gmail.com', '04-01-1996', '06-30-2020', 'O'
);
