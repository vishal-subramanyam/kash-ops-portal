SELECT SUM(Projects.total_projected_hours), SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours )
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets 
JOIN kash_operations_created_projects_table AS Projects
ON Timesheets.EMP_ID = userss.EMP_ID 
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


-- GET TOTAL HOURS BILLED PER users WITH PROJECT AND COMPANY DETAILS
SELECT Timesheets.sow_id, Projects.company_id, userss.First_Name, userss.Last_Name, userss.Emp_Id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours )
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets
JOIN KASH_OPERATIONS_users_TABLE AS userss ON Timesheets.EMP_ID = userss.EMP_ID
JOIN kash_operations_created_projects_table AS Projects 
ON Timesheets.sow_id = Projects.sow_id
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''
GROUP BY userss.First_Name, userss.Last_Name, userss.Emp_Id, Timesheets.sow_id, Projects.company_id;


-- GET COMPANY ADMINS PER COMPANY WITH EMPLOYEE DETAILS
select comp_admin.company_id, comp_admin.kash_operations_usn, company.company_name, comp_admin.emp_id, users.employee_type, users.first_name, users.last_name, users.admin_level, users.email_address, users.phone_number, users.emp_location_city, users.emp_location_state, users.emp_location_country, users.employee_contractor_name
from kash_operations_company_admin_role_table as comp_admin
join kash_operations_company_table as company
on comp_admin.company_id = company.company_id
join kash_operations_user_table as users
on comp_admin.emp_id = users.emp_id


-- Great created projects per company with timesheet billed hours
SELECT Projects.project_category, Projects.sow_id, Companies.company_id, Companies.company_name, Projects.total_projected_hours, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours) AS Total_Billed_Hours
FROM kash_operations_created_projects_table AS Projects 
JOIN kash_operations_company_table AS Companies ON Projects.company_id = Companies.company_id 
JOIN kash_operations_timesheet_table AS Timesheets
ON Projects.sow_id = Timesheets.sow_id 
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' 
GROUP BY Projects.project_category, Projects.sow_id, Companies.company_name, Companies.company_id
ORDER BY Companies.company_name

-- Below query is more efficient than the aboves to get all project data including billed hours and company info

select Projects.project_category, Projects.sow_id, Projects.total_projected_hours, Companies.CurrentStatus, All_Timesheets.Total_Hours_Billed, Companies.company_id, Companies.company_name from kash_operations_created_projects_table as projects 
LEFT OUTER JOIN (select Timesheets.sow_id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours) as Total_Hours_Billed from kash_operations_timesheet_table as Timesheets group by Timesheets.sow_id) as All_Timesheets
ON Projects.sow_id = All_Timesheets.sow_id
join kash_operations_company_table as Companies on Projects.company_id = Companies.company_id


select Projects.project_category, Projects.sow_id, Projects.total_projected_hours, Projects.current_status, All_Timesheets.Total_Hours_Billed, Companies.company_id, Companies.company_name from kash_operations_created_projects_table as projects LEFT OUTER JOIN (select Timesheets.sow_id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours) as Total_Hours_Billed from kash_operations_timesheet_table as Timesheets group by Timesheets.sow_id) as All_Timesheets ON Projects.sow_id = All_Timesheets.sow_id join kash_operations_company_table as Companies on Projects.company_id = Companies.company_id



-- =============================
-- Get Avg Hours Billed 
SELECT Users.First_Name, Users.Last_Name, Users.Emp_Id, 
    SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) 
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets
JOIN KASH_OPERATIONS_USER_TABLE AS Users 
ON Timesheets.EMP_ID = Users.EMP_ID 
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''
GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id

-- Get Total Hours Billed by user by company project
SELECT Timesheets.sow_id, Projects.company_id, Users.First_Name, Users.Last_Name, Users.Emp_Id, 
    SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Hours_Billed
FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets 
JOIN KASH_OPERATIONS_USER_TABLE AS Users 
ON Timesheets.EMP_ID = Users.EMP_ID 
JOIN kash_operations_created_projects_table AS Projects 
ON Timesheets.sow_id = Projects.sow_id
WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''
GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id, Timesheets.sow_id, Projects.company_id
ORDER BY Users.first_name;


-- Get Total Hours Billed By User by Daily Timesheet Entries
SELECT Users.First_Name, Users.Last_Name, Users.Emp_Id, SUM(Timesheets.task_hours) FROM v_kash_operations_timesheet_table_date AS Timesheets JOIN KASH_OPERATIONS_USER_TABLE AS Users ON Timesheets.EMP_ID = Users.EMP_ID WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id

-- Get Total Hours Billed By User Timesheet by Period State Date
SELECT Users.First_Name, Users.Last_Name, Users.Emp_Id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets JOIN KASH_OPERATIONS_USER_TABLE AS Users ON Timesheets.EMP_ID = Users.EMP_ID WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id
