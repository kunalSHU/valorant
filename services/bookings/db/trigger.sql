CREATE OR REPLACE FUNCTION public.notify_testevent()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM pg_notify('new_testevent', row_to_json(NEW)::text);
    RETURN NULL;
END;
$function$