# Código de Creación de la Tabla #

CREATE TABLE `cart` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`count` INT(11) NOT NULL,
	`unitCost` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`currency` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`image` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`ID`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=50925
;
