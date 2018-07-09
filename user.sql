 create table list_user
(id number,
	username varchar2(30),
	password varchar2(2000),
	firstname varchar2(30),
	lastname varchar2(30),
	email varchar2(100));
 CREATE SEQUENCE list_user_seq INCREMENT BY 1 START WITH 300;

CREATE OR REPLACE TRIGGER list_user_trg
BEFORE INSERT ON list_user
FOR EACH ROW
WHEN (new.id IS NULL)
BEGIN
SELECT list_user_seq.nextval into :new.id from dual;
END;
