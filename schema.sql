-- schema.sql

CREATE DATABASE IF NOT EXISTS recycling_hiring;
USE recycling_hiring;

-- 1. Candidates Table
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    experience_years INT,
    skills JSON, -- Storing skills as JSON for flexibility
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Evaluations Table (AI Scores)
CREATE TABLE evaluations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    crisis_management_score DECIMAL(5,2),
    sustainability_score DECIMAL(5,2),
    team_motivation_score DECIMAL(5,2),
    ai_feedback TEXT,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- 3. Rankings Table
CREATE TABLE rankings (
    candidate_id INT PRIMARY KEY,
    total_score DECIMAL(5,2),
    rank_position INT, -- Note: Rank position usually calculated dynamically, but we will store the score.
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Index for faster retrieval of top candidates
CREATE INDEX idx_total_score ON rankings(total_score DESC);

-- TRIGGER: Auto-update rankings when an evaluation is added [cite: 14]
DELIMITER //
CREATE TRIGGER after_evaluation_insert
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    DECLARE avg_score DECIMAL(5,2);
    
    -- Calculate average of the 3 key metrics
    SET avg_score = (NEW.crisis_management_score + NEW.sustainability_score + NEW.team_motivation_score) / 3;
    
    -- Insert or Update the ranking table
    INSERT INTO rankings (candidate_id, total_score)
    VALUES (NEW.candidate_id, avg_score)
    ON DUPLICATE KEY UPDATE total_score = avg_score;
END;
//
DELIMITER ;