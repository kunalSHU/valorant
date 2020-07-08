

INSERT INTO bookings_info.medication_tbl(
1, 'Kunaloacid', 100, 'wery effectiwe'
);

INSERT INTO bookings_info.medication_tbl(
2, 'Swethaoacid', 10, 'wery good'
);

INSERT INTO bookings_info.medication_tbl(
3, 'Dodooacid', 25, 'wery dodo'
);

INSERT INTO bookings_info.questionaire_tbl( 1, 'yes', 'yes', 'yes',  'yes', 'no', 'no','no','no','yes');

INSERT INTO bookings_info.questionaire_tbl( 2, 'no', 'yes', 'yes',  'yes', 'yes', 'no','yes','no','yes');

INSERT INTO bookings_info.questionaire_tbl( 3, 'no', 'no', 'yes',  'no', 'yes', 'no','yes','no','yes');


INSERT INTO bookings_info.appointments_info_basic_tbl(1, 1, 1, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Upcoming', NULL, NULL, NULL);

INSERT INTO bookings_info.appointments_info_basic_tbl(2, 2, 2, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Upcoming', NULL, NULL, NULL);

INSERT INTO bookings_info.appointments_info_basic_tbl(3, 3, 3, 3, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Cancelled', NULL, NULL, NULL);
    
INSERT INTO bookings_info.appointments_info_basic_tbl(4, 2, 3, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Completed', 1, 10, '100');

INSERT INTO bookings_info.appointments_info_basic_tbl(5, 4, 3, 1, '2020-04-12 05:05:25', '2020-04-12 05:05:25', 
        '2020-04-12 05:05:25', 'In-Person', 'Completed', 100, 10, '100');
