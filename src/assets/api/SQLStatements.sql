SELECT SUM(Projects.total_projected_hours), SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours )
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets 
JOIN kash_operations_created_projects_table AS Projects
ON Timesheets.EMP_ID = Users.EMP_ID 
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''


SELECT SUM(Projects.total_projected_hours) AS Total_Projected_Hours,
 SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours 
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets 
JOIN kash_operations_created_projects_table AS Projects 
ON Timesheets.SOW_ID = Projects.SOW_ID
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''

-- GET SUM OF BILLED HOURS PER PROJECT
SELECT SOW_ID, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''
GROUP BY SOW_ID
ORDER BY SOW_ID

-- GET BILLED HOURS ON PROJECTS ASSOCIATED TO COMPANIES

SELECT Projects.project_category, Projects.sow_id, Companies.company_name, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours 
FROM kash_operations_created_projects_table AS Projects 
JOIN kash_operations_company_table AS Companies 
ON Projects.company_id = Companies.company_id 
JOIN kash_operations_timesheet_table AS Timesheets 
ON Projects.sow_id = Timesheets.sow_id 
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' 
GROUP BY Projects.project_category, Projects.sow_id, Companies.company_name ORDER BY Companies.company_name


SELECT Projects.SOW_ID, Projects.project_category, Projects.company_id, Projects.total_projected_hours, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets JOIN kash_operations_created_projects_table AS Projects ON Timesheets.SOW_ID = Projects.SOW_ID WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.SOW_ID ORDER BY Projects.SOW_ID;


-- GET TOTAL HOURS BILLED PER USER WITH PROJECT AND COMPANY DETAILS
SELECT Timesheets.sow_id, Projects.company_id, Users.First_Name, Users.Last_Name, Users.Emp_Id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours )
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets
JOIN KASH_OPERATIONS_USER_TABLE AS Users ON Timesheets.EMP_ID = Users.EMP_ID
JOIN kash_operations_created_projects_table AS Projects 
ON Timesheets.sow_id = Projects.sow_id
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''
GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id, Timesheets.sow_id, Projects.company_id;

