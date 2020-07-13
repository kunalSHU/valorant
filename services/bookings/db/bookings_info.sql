 \connect bookings_db;
DROP SCHEMA IF EXISTS BOOKINGS_INFO CASCADE;
CREATE SCHEMA BOOKINGS_INFO;
SET search_path TO BOOKINGS_INFO;

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

/* List of all medications available in the doctors pharmacy office */
CREATE TABLE medication_tbl (
    medicationid   INTEGER     NOT NULL PRIMARY KEY,
    medicationName VARCHAR     NOT NULL, 
    medicationCost VARCHAR     NOT NULL, 
    manufacturer   VARCHAR     NOT NULL,
    form           VARCHAR     NOT NULL,
    pack           VARCHAR     NOT NULL,
    otherDetails   TEXT
);

CREATE TABLE allergy_tbl(
    allergyid      INTEGER    NOT NULL PRIMARY KEY,
    allergyName    VARCHAR    NOT NULL,
    otherFacts     VARCHAR
);

/* UserID should be treated like a foreign key in our code */
CREATE TABLE user_vitals_tbl(
    vitalid        INTEGER   NOT NULL PRIMARY KEY,
    userid         INTEGER   NOT NULL,
    bloodpressure  VARCHAR,
    bloodtype      VARCHAR,
    height         VARCHAR,
    weight         VARCHAR,
    dateChecked    DATE
);

/* UserID and doctorID should be treated like a foreign key in our code */
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
    FOREIGN KEY (questionaireid) REFERENCES questionaire_tbl(questionaireid)
);

CREATE TABLE prescribed_medications_tbl (
    appointmentid  INTEGER NOT NULL,
    medicationid   INTEGER NOT NULL,
    date_issued    DATE    NOT NULL,
    quantity       INTEGER NOT NULL,
    derivedCost    VARCHAR NOT NULL,
    PRIMARY KEY (appointmentid, medicationid),
    FOREIGN KEY (appointmentid) REFERENCES appointments_info_basic_tbl(appointmentid),
    FOREIGN KEY (medicationid) REFERENCES medication_tbl(medicationid)
);

CREATE TABLE user_allergy_tbl (
    userid    INTEGER NOT NULL,
    allergyid  INTEGER NOT NULL,
    PRIMARY KEY (userid, allergyid),
    FOREIGN KEY (allergyid) REFERENCES allergy_tbl(allergyid)

);