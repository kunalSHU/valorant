CREATE TRIGGER updated_status AFTER UPDATE 
ON bookings_info.appointments_info_basic_tbl
FOR EACH ROW EXECUTE PROCEDURE notify_testevent();