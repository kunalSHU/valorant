
INSERT INTO bookings_info.medication_tbl VALUES (
1, 'Advil', '100', 'Patheon', 'Pill', '50', 'wery effectiwe');
INSERT INTO bookings_info.medication_tbl VALUES (
2, 'Swethaoacid', '10', 'wery good', 'Syrup', '50', 'wery effectiwe');
INSERT INTO bookings_info.medication_tbl VALUES (
3, 'Dodooacid', '25', 'wery dodo', 'Injection', '50', 'wery effectiwe');

INSERT INTO bookings_info.allergy_tbl VALUES (1, 'Peanuts', 'Can be severe');
INSERT INTO bookings_info.allergy_tbl VALUES (2, 'Apples', NULL);
INSERT INTO bookings_info.allergy_tbl VALUES (3, 'Bees', NULL);
INSERT INTO bookings_info.allergy_tbl VALUES (4, 'Gluten', NULL);
INSERT INTO bookings_info.allergy_tbl VALUES (5, 'Soy', NULL);

INSERT INTO bookings_info.questionaire_tbl VALUES (1, 'yes', 'yes', 'yes',  'yes', 'no', 'no','no','no');
INSERT INTO bookings_info.questionaire_tbl VALUES(2, 'no', 'yes', 'yes',  'yes', 'yes', 'no','yes','no');
INSERT INTO bookings_info.questionaire_tbl VALUES (3, 'no', 'no', 'yes',  'no', 'yes', 'no','yes','no');



INSERT INTO bookings_info.appointments_info_basic_tbl VALUES (1, 1, 1, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Upcoming');

INSERT INTO bookings_info.appointments_info_basic_tbl VALUES (2, 2, 2, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Upcoming');

INSERT INTO bookings_info.appointments_info_basic_tbl VALUES (3, 3, 3, 3, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Cancelled');
    
INSERT INTO bookings_info.appointments_info_basic_tbl VALUES (4, 2, 3, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Completed');

INSERT INTO bookings_info.user_allergy_tbl VALUES(2, 1);

INSERT INTO bookings_info.user_allergy_tbl VALUES(1, 5);

INSERT INTO bookings_info.user_allergy_tbl VALUES(3, 4);

/*Invalid entry
INSERT INTO bookings_info.user_allergy_tbl VALUES(3, 7); */

INSERT INTO bookings_info.prescribed_medications_tbl
 VALUES (1, 1, '05-22-2020', 4, 50.00);

/*Invalid entry
INSERT INTO bookings_info.prescribed_medications_tbl
 VALUES (12, 1, '05-22-2018', 4, 50.00); */

INSERT INTO bookings_info.prescribed_medications_tbl
 VALUES (1, 2, '05-22-2018', 4, 50.00);

/*Invalid entry
INSERT INTO bookings_info.prescribed_medications_tbl
 VALUES (1, 1, '05-22-2018', 4, 50.00); */

INSERT INTO bookings_info.prescribed_medications_tbl
 VALUES (3, 2, '05-22-2018', 4, 50.00);


 INSERT INTO bookings_info.user_vitals_tbl VALUES (
        1, 1, NULL, NULL, '165', NULL, NULL
 );

 INSERT INTO bookings_info.user_vitals_tbl VALUES (
        2, 1, NULL, NULL, NULL, NULL, '05-22-2018'
 );

 INSERT INTO bookings_info.user_vitals_tbl VALUES (
        3, 1, NULL, NULL, '165', NULL, '05-22-2017'
 );

 INSERT INTO bookings_info.user_vitals_tbl VALUES (
        4, 1, NULL, NULL, '1170', NULL, '05-22-2016'
 );