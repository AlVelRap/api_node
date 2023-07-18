-- Create DB
DROP SCHEMA IF EXISTS `testdb` ;
CREATE SCHEMA IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

-- Create user
drop user if exists 'tester'@'%';
CREATE USER IF NOT EXISTS 'tester'@'%' IDENTIFIED BY 'testdb';
GRANT ALL PRIVILEGES ON testdb.* TO 'tester'@'%';

-- Create Tables
USE `testdb` ;
-- Table `dietariodb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `lastname` VARCHAR(64) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--  User: Alberto   Password: prueba
insert into user(name, lastname, email, password,salt) values('alberto', "Velázquez Rapado", "alberto@dominio.com", 'Y5CF9wdr0+viTA+jG9y5Cs6ndhpf/5blHMm/Vh+eTRWeqhetWBf3TyAugoBqk53Xmj4DKpzlmVJ0zM0WoIsj+A==','IFnr67IdjrCsTm5OPyJzSA==');
--  User: paco   Password: paco
insert into user(name, lastname, email, password,salt) values('paco', "Fernández Carrión", "paco@dominio.com",'godxF230zv+Yr8zIDHjeaBAM5vSCnyC6TeL1FvhohEZAEcMBTQLc34TlHST4dCY2jKg6Gmvx42CnQPAg7NxUyQ==','bJqgBDpT+5yYLs6MwxzGpg==');
--  User: antonio   Password: antonio
insert into user(name, lastname, email, password,salt) values('antonio', "Gómez García", "antonio@dominio.com",'5zG7OxB/WZgf2vTLWS42c6PsC+dlRrz8eytu2TG5WMFq2uZknFWGeHABT3hbedCPGv5eaBx+7XB4dHeynmPP0w==','b1JSmJvYQr7Ow3uSSvS7BQ==');
--  User: juan   Password: juan
insert into user(name, lastname, email, password,salt) values('juan', "Hernandez Salamanqués", "juan@dominio.com",'q6phb1EeFxFWJy/B/32aHLOZRCaHRbtN4bnSjY8YrmoTK2yMvI+7TwqM29jTGpFapeDowCrsThnPKy6XnM0l7g==','d/Pej947wuAz4GT7HNyBhg==');
