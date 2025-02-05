CREATE DATABASE IF NOT EXISTS mini_link_db;
USE mini_link_db;

/*
 * Delete tables if they exist.
 */
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS user_sessions
DROP TABLE IF EXISTS mini_links;
DROP EVENT IF EXISTS delete_expired_links;
SET FOREIGN_KEY_CHECKS = 1;

-- Create sessions table
CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY
)

-- Create mini links table
CREATE TABLE mini_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(1024) NOT NULL,
    alias VARCHAR(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL UNIQUE,
    expiration DATETIME NOT NULL,
    visits INT NOT NULL DEFAULT 0,
    session_id VARCHAR(255),
    FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- Create event to automatically delete expired mini links
CREATE EVENT IF NOT EXISTS delete_expired_links
ON SCHEDULE EVERY 1 DAY
DO
DELETE FROM mini_links WHERE expiration < NOW();