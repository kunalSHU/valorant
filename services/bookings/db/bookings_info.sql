 \connect bookings-db;
DROP SCHEMA IF EXISTS BOOKINGS_INFO CASCADE;
CREATE SCHEMA BOOKINGS_INFO;
SET search_path TO BOOKINGS_INFO;


CREATE TABLE medication_tbl (
    medicationid   INTEGER     NOT NULL PRIMARY KEY,
    medicationName VARCHAR     NOT NULL, 
    medicationCost VARCHAR     NOT NULL, 
    otherDetails   TEXT
);

CREATE TABLE questionaire_tbl (
    questionaireid INTEGER     NOT NULL PRIMARY KEY,
    flu            VARCHAR     NOT NULL,
    sneeze         VARCHAR     NOT NULL,
    shivers        VARCHAR     NOT NULL,
    headache       VARCHAR     NOT NULL,
    jointPain        VARCHAR     NOT NULL,
    troubleSleeping  VARCHAR     NOT NULL,
    shortnessOfBreath  VARCHAR     NOT NULL,
    nausea           VARCHAR     NOT NULL
);

CREATE TABLE appointments_info_basic_tbl (
    appointmentid  INTEGER     NOT NULL PRIMARY KEY,
    userid         INTEGER     NOT NULL,
    questionaireid INTEGER     NOT NULL, 
    doctorid       INTEGER     NOT NULL,
    created_at     TIMESTAMP    NOT NULL,
    begins_at      TIMESTAMP    NOT NULL,
    ends_at        TIMESTAMP    NOT NULL,
    appt_type      VARCHAR     NOT NULL,
    status_appt    VARCHAR     NOT NULL,
    medicationid   INTEGER,
    quantity       INTEGER,
    derivedCost    VARCHAR,
    FOREIGN KEY (medicationid) REFERENCES medication_tbl(medicationid),
    FOREIGN KEY (questionaireid) REFERENCES questionaire_tbl(questionaireid)
);