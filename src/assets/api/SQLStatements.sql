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

-- SQL QUERIES FOR CONTROL CENTER KPIs FUNCTIONS: 
    -- totalProjectedHours
        -- TABLE: TOTAL_PROJECTED_HOURS_TABLE
    SELECT SUM(total_projected_hours) AS TOTAL_PROJECTED_HOURS FROM KASH_OPERATIONS_CREATED_PROJECTS_TABLE

    -- AGAINST kash_operations_timesheet_table BY PERIOD START DATE
        -- avgHrsBilled
            -- TABLE: TIMESHEET_BY_USER_HOURS_BILLED_TABLE


        -- hoursBilledPerProject
            -- TABLE: TIMESHEET_USER_HOURS_BILLED_PER_COMPANY_PROJECT_TABLE
        SELECT Timesheets.sow_id, Projects.company_id, Users.First_Name, Users.Last_Name, Users.Emp_Id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Hours_Billed FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets JOIN KASH_OPERATIONS_USER_TABLE AS Users ON Timesheets.EMP_ID = Users.EMP_ID JOIN kash_operations_created_projects_table AS Projects ON Timesheets.sow_id = Projects.sow_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id, Timesheets.sow_id, Projects.company_id ORDER BY Users.first_name


        -- totalBilledHours
            -- TABLE: TOTAL_HOURS_BILLED_BY_PROJECT_TABLE

        SELECT Projects.sow_id, Projects.company_id, Projects.total_projected_hours, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets JOIN KASH_OPERATIONS_CREATED_PROJECTS_TABLE AS Projects ON Timesheets.sow_id = Projects.sow_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.SOW_ID ORDER BY Projects.SOW_ID


        -- avgHoursPerCompany
                --TABLE: HOURS_BILLED_BY_COMPANY_PROJECT_TABLE
            SELECT Projects.project_category, Projects.sow_id, Companies.company_name, Projects.total_projected_hours, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours FROM kash_operations_created_projects_table AS Projects JOIN kash_operations_company_table AS Companies ON Projects.company_id = Companies.company_id JOIN kash_operations_timesheet_table AS Timesheets ON Projects.sow_id = Timesheets.sow_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.project_category, Projects.sow_id, Companies.company_name ORDER BY Companies.company_name
                
        -- projectsBilledAndProjectedHoursByCompany
 -- TABLE: HOURS_BILLED_AND_PROJECTED_BY_COMPANY_PROJECT_TABLE
        select Projects.project_category, Projects.sow_id, Projects.original_start_date, Projects.original_end_date, Projects.total_projected_hours, Projects.current_status, All_Timesheets.Total_Billed_Hours, Companies.company_id, Companies.company_name from kash_operations_created_projects_table as projects LEFT OUTER JOIN (select Timesheets.sow_id, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours) as Total_Billed_Hours from kash_operations_timesheet_table as Timesheets group by Timesheets.sow_id) as All_Timesheets ON Projects.sow_id = All_Timesheets.sow_id join kash_operations_company_table as Companies on Projects.company_id = Companies.company_id


    -- AGAINST v_kash_operations_timesheet_table_date
        -- avgHrsBilled
            -- TABLE: TIMESHEET_BY_USER_HOURS_BILLED_TABLE
        SELECT Users.First_Name, Users.Last_Name, Users.Emp_Id, SUM(Timesheets.task_hours) FROM v_kash_operations_timesheet_table_date AS Timesheets JOIN KASH_OPERATIONS_USER_TABLE AS Users ON Timesheets.EMP_ID = Users.EMP_ID WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id

        -- hoursBilledPerProject
            -- TABLE: TIMESHEET_USER_HOURS_BILLED_PER_COMPANY_PROJECT_TABLE
        SELECT Timesheets.sow_id, Projects.company_id, Users.First_Name, Users.Last_Name, Users.Emp_Id, SUM(Timesheets.task_hours) AS Total_Hours_Billed FROM v_kash_operations_timesheet_table_date AS Timesheets JOIN KASH_OPERATIONS_USER_TABLE AS Users ON Timesheets.EMP_ID = Users.EMP_ID JOIN kash_operations_created_projects_table AS Projects ON Timesheets.sow_id = Projects.sow_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = ''GROUP BY Users.First_Name, Users.Last_Name, Users.Emp_Id, Timesheets.sow_id, Projects.company_id ORDER BY Users.first_name



        -- totalBilledHours
            -- TABLE: TOTAL_HOURS_BILLED_BY_PROJECT_TABLE

        SELECT Projects.sow_id, Projects.company_id, Projects.total_projected_hours, SUM(Timesheets.task_hours) AS Total_Hours_Billed FROM v_kash_operations_timesheet_table_date AS Timesheets JOIN KASH_OPERATIONS_CREATED_PROJECTS_TABLE AS Projects ON Timesheets.sow_id = Projects.sow_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.SOW_ID ORDER BY Projects.SOW_ID


        -- avgHoursPerCompany
            --TABLE: HOURS_BILLED_BY_COMPANY_PROJECT_TABLE

        SELECT Projects.project_category, Projects.sow_id, Companies.company_name, Projects.total_projected_hours, SUM(Timesheets.task_hours) AS Total_Billed_Hours FROM kash_operations_created_projects_table AS Projects JOIN kash_operations_company_table AS Companies ON Projects.company_id = Companies.company_id JOIN v_kash_operations_timesheet_table_date AS Timesheets ON Projects.sow_id = Timesheets.sow_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.project_category, Projects.sow_id, Companies.company_name ORDER BY Companies.company_name


SELECT Projects.project_category, Projects.sow_id, Companies.company_name, Projects.total_projected_hours, Timesheets.Entry_Date, SUM(Timesheets.task_hours) AS Total_Billed_Hours FROM v_kash_operations_timesheet_table_date AS Timesheets JOIN kash_operations_created_projects_table AS Projects ON Projects.sow_id = Timesheets.sow_id JOIN kash_operations_company_table AS Companies ON Projects.company_id = Companies.company_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.project_category, Projects.sow_id, Companies.company_name, Timesheets.Entry_Date ORDER BY Companies.company_name




        -- projectsBilledAndProjectedHoursByCompany
            -- TABLE: HOURS_BILLED_AND_PROJECTED_BY_COMPANY_PROJECT_TABLE
        select Projects.project_category, Projects.sow_id, Projects.original_start_date, Projects.original_end_date, Projects.total_projected_hours, Projects.current_status, All_Timesheets.Total_Billed_Hours, Companies.company_id, Companies.company_name from kash_operations_created_projects_table as projects LEFT OUTER JOIN (select Timesheets.sow_id, SUM(Timesheets.task_hours) as Total_Billed_Hours from v_kash_operations_timesheet_table_date as Timesheets group by Timesheets.sow_id) as All_Timesheets ON Projects.sow_id = All_Timesheets.sow_id join kash_operations_company_table as Companies on Projects.company_id = Companies.company_id

        -- Get all billed hours with project and company data
            -- TABLE: ALL_TIMESHEETS_ENTRY_DATE_COMPANY_PROJECT
        SELECT Projects.project_category, Projects.sow_id, Projects.original_start_date, Projects.original_end_date, Projects.total_projected_hours, Projects.current_status, Timesheets.Entry_Date, Timesheets.Emp_Id, Timesheets.Task_Hours, Companies.company_id, Companies.company_name FROM v_kash_operations_timesheet_table_date as Timesheets join kash_operations_created_projects_table as projects on Timesheets.Sow_id = Projects.Sow_id join kash_operations_company_table as companies on Projects.Company_id = Companies.Company_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' order by entry_date


-- Timesheet report for searching records by date - from and to dates
select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, CONCAT(Company.Company_Name, ' - ', Project.Project_Category,' (', Project.Sow_Id, ') ') As Project_Description, Timesheets.Non_Billable_Reason, MAX(Timesheets.Timesheet_Status_Entry), Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, SUM(Timesheets.Task_Hours) As Total_Hours from v_kash_operations_timesheet_table_date as Timesheets join kash_operations_created_projects_table as Project on timesheets.sow_id = Project.sow_id join kash_operations_user_table as Users on Timesheets.Emp_Id = Users.Emp_Id join kash_operations_company_table as Company on Project.Company_Id = Company.Company_Id Where Timesheets.Entry_Date >= ? AND Timesheets.Entry_Date <= ? Group By Full_Name, Project_Description, Timesheets.Non_Billable_Reason,  Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num Order by Full_Name





-- Get Timesheet records by range and by company admin
SELECT timesheet.ENTRY_DATE, company.COMPANY_NAME, employee.FIRST_NAME || ' ' || employee.LAST_NAME AS "full_name", project.PROJECT_CATEGORY, timesheet.SUB_ASSIGNMENT, timesheet.SUB_ASSIGNMENT_SEGMENT_1, timesheet.TICKET_NUM, SUM(timesheet.TOTAL_HOURS) FROM v_kash_operations_timesheet_table_date AS timesheet LEFT OUTER JOIN KASH_OPERATIONS_CREATED_PROJECTS_TABLE AS project ON timesheet.SOW_ID = project.SOW_ID LEFT OUTER JOIN KASH_OPERATIONS_COMPANY_TABLE AS company ON project.COMPANY_ID = company.COMPANY_ID LEFT OUTER JOIN KASH_OPERATIONS_USER_TABLE AS employee ON timesheet.EMP_ID = employee.EMP_ID WHERE timesheet.EMP_ID=cast(? as integer) OR company.COMPANY_ID IN (SELECT COMPANY_ID FROM KASH_OPERATIONS_COMPANY_ADMIN_ROLE_TABLE WHERE EMP_ID=cast(? as integer)) ORDER BY timesheet.PERIOD_START_DATE DESC




-- Get Timesheet records by range
select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, CONCAT(Company.Company_Name, ' - ', Project.Project_Category,' (', Project.Sow_Id, ') ') As Project_Description, Timesheets.Non_Billable_Reason, MAX(Timesheets.Timesheet_Status_Entry) As Entry_Status, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, SUM(Timesheets.Task_Hours) As Total_Hours 
from v_kash_operations_timesheet_table_date as Timesheets 
join kash_operations_created_projects_table as Project 
on timesheets.sow_id = Project.sow_id 
join kash_operations_user_table as Users
on Timesheets.Emp_Id = Users.Emp_Id
join kash_operations_company_table as Company on Project.Company_Id = Company.Company_Id
WHERE timesheet.EMP_ID=cast(? as integer) OR company.COMPANY_ID IN (SELECT COMPANY_ID FROM KASH_OPERATIONS_COMPANY_ADMIN_ROLE_TABLE WHERE EMP_ID=cast(? as integer)) AND Timesheets.Entry_Date >= ? AND Timesheets.Entry_Date <= ? 
Group By Full_Name, Project_Description, Timesheets.Non_Billable_Reason,  Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num
Order by Full_Name


-- Get timesheet records by range
select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, CONCAT(Company.Company_Name, ' - ', Project.Project_Category,' (', Project.Sow_Id, ') ') As Project_Description, Timesheets.Non_Billable_Reason, MAX(Timesheets.Timesheet_Status_Entry) as Status, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, SUM(Timesheets.Task_Hours) As Total_Hours  
from v_kash_operations_timesheet_table_date as Timesheets 
join kash_operations_created_projects_table as Project 
on Timesheets.sow_id = Project.sow_id
join kash_operations_user_table as Users
on Timesheets.Emp_Id = Users.Emp_Id
join kash_operations_company_table as Company
on Project.Company_Id = Company.Company_Id 
where Timesheets.Entry_Date >= '2024-01-01' AND Timesheets.Entry_Date <= '2024-04-01'
Group By Full_Name, Project_Description, Timesheets.Non_Billable_Reason,  Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num
Order by Full_Name, Project_Description

-- TABLE: TOTAL_HOURS_BILLED_BY_PROJECT
-- Updated SQL with Company.company_name and joined the company table to get the company name for the data output
SELECT Projects.sow_id, Company.company_name, Projects.company_id, Projects.total_projected_hours, SUM(Timesheets.monday_hours +Timesheets.tuesday_hours +Timesheets.wednesday_hours + Timesheets.thursday_hours + Timesheets.friday_hours +Timesheets.saturday_hours + Timesheets.sunday_hours ) AS Total_Billed_Hours FROM KASH_OPERATIONS_TIMESHEET_TABLE AS Timesheets JOIN KASH_OPERATIONS_CREATED_PROJECTS_TABLE AS Projects ON Timesheets.sow_id = Projects.sow_id JOIN KASH_OPERATIONS_COMPANY_TABLE AS Company ON Projects.company_id = Company.company_id WHERE Timesheets.non_billable_reason = 'n/a' OR Timesheets.non_billable_reason = 'N/A' OR Timesheets.non_billable_reason = '' GROUP BY Projects.SOW_ID, Company.company_name ORDER BY Projects.SOW_ID


-- Get Timesheet Data for Invoice creation
SELECT
company.company_name,
project.project_category,
project.sow_id,
sub_cat.project_sub_task_id as work_area_id,
sub_cat.sub_task_title as work_area,
sub_cat.segment_1 as task_area,
CONCAT(employee.first_name, ' ', employee.last_name) as Full_Name,
SUM(timesheet.task_hours)
FROM v_kash_operations_timesheet_table_date as timesheet
JOIN kash_operations_created_projects_table as project
ON timesheet.sow_id = project.sow_id
JOIN kash_operations_project_sub_category_table as sub_cat
ON project.sow_id = sub_cat.sow_id
JOIN kash_operations_company_table as company
ON project.company_id = company.company_id
JOIN kash_operations_user_table as employee
ON timesheet.emp_id = employee.emp_id
WHERE timesheet.entry_date >= (searchFromDate) AND timesheet.entry_date <= (searchToDate) -- passed as query params to config 
GROUP BY
company.company_name,
project.project_category,
project.sow_id,
employee.first_name, 
employee.last_name,
sub_cat.project_sub_task_id,
sub_cat.sub_task_title,
sub_cat.segment_1
ORDER BY company.company_name


-- SQL for fetching Timesheet data by date range
select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, Company.Company_Name, Project.Project_Category, Project.Sow_Id, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, SUM(Timesheets.Task_Hours) As Total_Hours from v_kash_operations_timesheet_table_date as Timesheets join kash_operations_created_projects_table as Project on timesheets.sow_id = Project.sow_id join kash_operations_user_table as Users on Timesheets.Emp_Id = Users.Emp_Id join kash_operations_company_table as Company on Project.Company_Id = Company.Company_Id where (Timesheets.Entry_Date >=cast(? as date) AND Timesheets.Entry_Date <=cast(? as date)) AND (Timesheets.non_billable_reason IN ('n/a','N/A','')) Group By Full_Name, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Company.Company_Name, Project.Project_Category, Project.Sow_Id Order by Full_Name


-- SQL to get TS data filtered by range - altered TABLE: TIMESHEET_HOURS_BILLED_RANGE_TABLE
select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, CONCAT(Company.Company_Name, ' - ', Project.Project_Category,' (', Project.Sow_Id, ') ') As Project_Description, Company.Company_Name, Project.Project_Category, Project.Sow_Id, Timesheets.Non_Billable_Reason, MAX(Timesheets.Timesheet_Status_Entry) As Entry_Status, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, Timesheets.Entry_Date, SUM(Timesheets.Task_Hours) As Total_Hours from v_kash_operations_timesheet_table_date as Timesheets join kash_operations_created_projects_table as Project on timesheets.sow_id = Project.sow_id join kash_operations_user_table as Users on Timesheets.Emp_Id = Users.Emp_Id join kash_operations_company_table as Company on Project.Company_Id = Company.Company_Id where (Timesheets.Entry_Date >=cast(? as date) AND Timesheets.Entry_Date <=cast(? as date)) AND (Timesheets.non_billable_reason IN ('n/a','N/A','')) Group By Full_Name, Project_Description, Timesheets.Non_Billable_Reason,  Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, Company.Company_Name, Project.Project_Category, Project.Sow_Id Order by Full_Name

-- SQL to get TS data filtered by range - TABLE: TIMESHEET_HOURS_BILLED_RANGE_TABLE
select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, CONCAT(Company.Company_Name, ' - ', Project.Project_Category,' (', Project.Sow_Id, ') ') As Project_Description, Timesheets.Non_Billable_Reason, Company.Company_Name, MAX(Timesheets.Timesheet_Status_Entry) As Entry_Status, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, SUM(Timesheets.Task_Hours) As Total_Hours from v_kash_operations_timesheet_table_date as Timesheets join kash_operations_created_projects_table as Project on timesheets.sow_id = Project.sow_id join kash_operations_user_table as Users on Timesheets.Emp_Id = Users.Emp_Id join kash_operations_company_table as Company on Project.Company_Id = Company.Company_Id where Timesheets.Entry_Date >=cast(? as date) AND Timesheets.Entry_Date <=cast(? as date) Group By Full_Name, Project_Description, Timesheets.Non_Billable_Reason,  Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, Company.Company_Name Order by Full_Name

select CONCAT(Users.First_Name, ' ', Users.Last_Name) As Full_Name, CONCAT(Company.Company_Name, ' - ', Project.Project_Category,' (', Project.Sow_Id, ') ') As Project_Description, Timesheets.Non_Billable_Reason, Company.Company_Name, MAX(Timesheets.Timesheet_Status_Entry) As Entry_Status, Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, SUM(Timesheets.Task_Hours) As Total_Hours from v_kash_operations_timesheet_table_date as Timesheets join kash_operations_created_projects_table as Project on timesheets.sow_id = Project.sow_id join kash_operations_user_table as Users on Timesheets.Emp_Id = Users.Emp_Id join kash_operations_company_table as Company on Project.Company_Id = Company.Company_Id where Timesheets.Entry_Date >='2024-04-01' AND Timesheets.Entry_Date <= '2024-04-16' Group By Full_Name, Project_Description, Timesheets.Non_Billable_Reason,  Timesheets.Sub_Assignment, Timesheets.Sub_Assignment_Segment_1, Timesheets.Ticket_Num, Company.Company_Name Order by Full_Name
