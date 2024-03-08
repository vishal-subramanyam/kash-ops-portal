USE ASSET_MANAGEMENT
CREATE VIEW public.v_kash_operations_timesheet_table_date
AS
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
        odt.emp_id,
        odt.sow_id,
        odt.ticket_num,
        (CAST(odt.period_start_date AS DATE) + INTERVAL '1 day' * date_offset.offset)::DATE AS entry_date,
        odt.billable,
        odt.non_billable_reason,
        odt.timesheet_status_entry,
        odt.sub_assignment,
        odt.sub_assignment_segment_1,
        odt.sub_assignment_segment_2,
        odt.timesheet_entry_id,
        CASE
            WHEN date_offset.day = 'Monday' THEN odt.monday_hours
            WHEN date_offset.day = 'Tuesday' THEN odt.tuesday_hours
            WHEN date_offset.day = 'Wednesday' THEN odt.wednesday_hours
            WHEN date_offset.day = 'Thursday' THEN odt.thursday_hours
            WHEN date_offset.day = 'Friday' THEN odt.friday_hours
            WHEN date_offset.day = 'Saturday' THEN odt.saturday_hours
            WHEN date_offset.day = 'Sunday' THEN odt.sunday_hours
        END AS task_hours
    FROM kash_operations_timesheet_table odt
    CROSS JOIN day_offsets date_offset
)
SELECT
    t.entry_date,
    t.emp_id,
    t.sow_id,
    t.ticket_num,
    t.billable,
    t.non_billable_reason,
    t.timesheet_status_entry,
    t.sub_assignment,
    t.sub_assignment_segment_1,
    t.sub_assignment_segment_2,
    t.timesheet_entry_id,
    t.task_hours
FROM transformed t