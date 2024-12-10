-- CREATE DATABASE reservations;

USE reservations;

DROP TABLE IF EXISTS players;
CREATE TABLE players(
	id INT AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    position VARCHAR(255),
    jersy INT,
    team VARCHAR(1),
    timestamp DATETIME DEFAULT NOW(),
    
    PRIMARY KEY (id) 
);

INSERT INTO players (firstName, lastName, position, jersy, team) VALUES('John', 'Doe', 'GK', '56', 'A');

SELECT * FROM players;
