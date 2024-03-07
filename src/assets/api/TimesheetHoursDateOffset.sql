
-- Assuming your original data table structure is something like this:
-- CREATE TABLE original_data_table (
--     "Period Start Date" DATE,
--     "Company Name" TEXT,
--     "Full Name" TEXT,
--     "Project Category" TEXT,
--     "Ticket Num" TEXT,
--     "Monday Hours" INT,
--     "Tuesday Hours" INT,
--     ...,
--     "Sunday Hours" INT
-- );
-- Assuming transformed_data_table has a structure ready to hold the transformed data:
-- CREATE TABLE transformed_data_table (
--     "Period Start Date" TEXT,
--     "Company Name" TEXT,
--     "Full Name" TEXT,
--     "Project Category" TEXT,
--     "Ticket Num" TEXT,
--     "Hours" INT
-- );
-- Use a CTE to define day offsets
-- SELECT period_start_date AS Period_Start_Date, emp_id, sow_id, ticket_num, monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours, saturday_hours, sunday_hours 
WITH day_offsets AS (
    SELECT 'Monday' AS day, 0 AS offset
    UNION ALL SELECT 'Tuesday', 1
    UNION ALL SELECT 'Wednesday', 2
    UNION ALL SELECT 'Thursday', 3
    UNION ALL SELECT 'Friday', 4
    UNION ALL SELECT 'Saturday', 5
    UNION ALL SELECT 'Sunday', 6
),
transformed AS (
    SELECT
        -- odt."Company Name",
        odt.emp_id,
        odt.sow_id,
        odt.ticket_num,
        (cast(odt.period_start_date AS Date) + INTERVAL '1 day' * date_offset.offset)::DATE AS period_start_date,
        CASE
            WHEN date_offset.day = 'Monday' THEN odt.monday_hours
            WHEN date_offset.day = 'Tuesday' THEN odt.tuesday_hours
            WHEN date_offset.day = 'Wednesday' THEN odt.wednesday_hours
            WHEN date_offset.day = 'Thursday' THEN odt.thursday_hours
            WHEN date_offset.day = 'Friday' THEN odt.friday_hours
            WHEN date_offset.day = 'Saturday' THEN odt.saturday_hours
            WHEN date_offset.day = 'Sunday' THEN odt.sunday_hours
        END AS "Hours"
    FROM kash_operations_timesheet_table odt
    CROSS JOIN day_offsets date_offset
)
SELECT
--     t.period_start_date,
--     -- t."Company Name",
--     t.emp_id,
--     t.sow_id,
--     COALESCE(t.ticket_num, '') AS "Ticket Num",
    t."Hours"
FROM transformed t;