CREATE OR REPLACE FUNCTION public.notify_update_status()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM pg_notify('update_status', row_to_json(NEW)::text);
    RETURN NULL;
END;
$function$
