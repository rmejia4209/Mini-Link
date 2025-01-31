CREATE DATABASE IF NOT EXISTS mini_link_db;
USE mini_link_db;

/*
 * Delete tables if they exist.
 */
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS mini_links;
SET FOREIGN_KEY_CHECKS = 1;

-- Create mini links table
CREATE TABLE mini_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(1024) NOT NULL,
    alias VARCHAR(10) NOT NULL UNIQUE,
    expiration DATETIME NOT NULL,
    visits INT NOT NULL DEFAULT 0
);