-- Create DB
DROP SCHEMA IF EXISTS `testdb` ;
CREATE SCHEMA IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

-- Create user
drop user if exists 'tester'@'%';
CREATE USER IF NOT EXISTS 'tester'@'%' IDENTIFIED BY 'testdb';
GRANT ALL PRIVILEGES ON testdb.* TO 'tester'@'%';