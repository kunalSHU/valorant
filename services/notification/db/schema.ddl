DROP SCHEMA IF EXISTS VALORANT CASCADE;
CREATE SCHEMA VALORANT;
SET search_path TO VALORANT;

-- 'userid' is the id of the user.
-- 'username' is the name of the user.
-- 'flags' all the flags are either set to Y or N depending on the permission settings
CREATE TABLE permissions_all_users(
    userid         INTEGER     PRIMARY KEY,
    username       VARCHAR     NOT NULL,
	admin_flag    VARCHAR     NOT NULL,
    doctor_flag   VARCHAR     NOT NULL,
    receptionist_flag VARCHAR NOT NULL,
    patient_flag     VARCHAR NOT NULL
);

-- only patient info
CREATE TABLE patient_info(
    userid         INTEGER     PRIMARY KEY,
    addressid      VARCHAR     FOREIGN KEY,
    username       VARCHAR     NOT NULL,
    first_name     VARCHAR     NOT NULL,
    last_name      VARCHAR     NOT NULL,
    phone_number   INTEGER     NOT NULL,
    email          VARCHAR     NOT NULL,
    birthdate      DATE        NOT NULL,
    date_became_patient DATE   NOT NULL,
    gender         TEXT(1)     NOT NULL
);

CREATE TABLE address_info(
    addressid      INTEGER     PRIMARY KEY,
    streetname     VARCHAR     NOT NULL,
    city           VARCHAR     NOT NULL,
    postal_code    VARCHAR     NOT NULL,
    province       VARCHAR     NOT NULL,
    country        VARCHAR     NOT NULL,
    otherdetails   VARCHAR
);

-- status is for ongoing, cancelled, done, completed etc... something like that
-- doctorid is the id of the doctor that has been assigned to this appointment
-- this should keep the most recent records (maybe just upcoming appts)
CREATE TABLE appointments (
    appointmentid  INTEGER     PRIMARY KEY,
    userid         INTEGER     FOREIGN KEY,
    questionaireid INTEGER     FOREIGN KEY,
    doctorid       INTEGER     FOREIGN KEY,
    created_at     DATETIME    NOT NULL,
    begins_at      DATETIME    NOT NULL,
    ends_at        DATETIME    NOT NULL,
    appt_type      VARCHAR     NOT NULL,
    status         VARCHAR     NOT NULL
);

-- fix
CREATE TABLE appointment_medication (
    appointmentid  INTEGER     PRIMARY KEY,
    medicationid   INTEGER     PRIMARY KEY,
    quantity       INTEGER     NOT NULL,
    derivedCost    VARCHAR     NOT NULL,
);

CREATE TABLE medication (
    medicationid   INTEGER     PRIMARY KEY,
    medicationName VARCHAR     NOT NULL,
    medicationCost VARCHAR     NOT NULL,
    otherDetails   TEXT
);

CREATE TABLE appointments_archive (
    userid         INTEGER,
    appointmentid  INTEGER,
    questionaireid INTEGER     NOT NULL,
    created_at     DATETIME    NOT NULL,
    begins_at      DATETIME    NOT NULL,
    ends_at        DATETIME    NOT NULL,
    doctorid       INTEGER     NOT NULL,
    appt_type      VARCHAR     NOT NULL,
    doctor_notes   TEXT        NOT NULL,
    status         VARCHAR     NOT NULL,
    PRIMARY KEY (userid, appointmentid)
);

CREATE TABLE personal_details (
    userid         INTEGER     PRIMARY KEY,
    weight         INTEGER,
    height         INTEGER,
    bloodpressure  INTEGER,
    glucose        INTEGER,
    dateNoted      DATE
);

CREATE TABLE personal_details_archive (
    userid         INTEGER,
    dateNoted      DATE
    weight         INTEGER,
    height         INTEGER,
    bloodpressure  INTEGER,
    glucose        INTEGER,
    PRIMARY KEY (userid, dateNoted)
);

CREATE TABLE doctors(
    doctorid      INTEGER      PRIMARY KEY,
    addressid     INTEGER      FOREIGN KEY,
    doctors_name  VARCHAR      NOT NULL,
    phone_number  INTEGER      NOT NULL
);