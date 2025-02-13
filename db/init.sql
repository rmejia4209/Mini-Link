CREATE DATABASE IF NOT EXISTS mini_link_db;

USE mini_link_db;

-- Delete tables if they exist.
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS mini_links;
DROP TABLE IF EXISTS mini_link_visits;
DROP EVENT IF EXISTS delete_expired_links;
SET FOREIGN_KEY_CHECKS = 1;

-- Create sessions table
CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY
);

-- Create mini links table
CREATE TABLE mini_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(1024) NOT NULL,
    alias VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL UNIQUE,
    expiration DATETIME NOT NULL,
    user_session_id VARCHAR(255),
    FOREIGN KEY (user_session_id) REFERENCES user_sessions(id)
);

-- Create visits table
CREATE TABLE mini_link_visits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    visit_date DATETIME NOT NULL,
    mini_link_id INT NOT NULL,
    FOREIGN KEY (mini_link_id) REFERENCES mini_links(id)
);


-- Create event to automatically delete expired mini links
DELIMITER //
CREATE EVENT IF NOT EXISTS delete_expired_links
ON SCHEDULE EVERY 1 DAY
DO
BEGIN

    DELETE mini_link_visits
    FROM mini_link_visits
    JOIN mini_links ON mini_link_visits.mini_link_id = mini_links.id
    WHERE mini_links.expiration < NOW();

    DELETE FROM mini_links WHERE expiration < NOW();

    DELETE user_sessions
    FROM user_sessions
    LEFT JOIN mini_links ON user_sessions.id = mini_links.user_session_id
    WHERE mini_links.id IS NULL;

END //
DELIMITER ;
