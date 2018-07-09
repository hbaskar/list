CREATE OR REPLACE TRIGGER hr_employees_trg
BEFORE INSERT ON hr.employees
FOR EACH ROW
WHEN (new.employee_id IS NULL)
BEGIN
SELECT hr_employees_seq.nextval into :new.employee_id from dual;
END;
/
