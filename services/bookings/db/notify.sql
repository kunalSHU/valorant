CREATE TRIGGER notify_update_status AFTER UPDATE 
ON bookings_info.appointments_info_basic_tbl
FOR EACH ROW EXECUTE PROCEDURE notify_update_status();
