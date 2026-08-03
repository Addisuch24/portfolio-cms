-- ==========================================
-- Complete Database Setup Script
-- Run this file to set up your database from scratch
-- ==========================================

-- Drop and recreate database
DROP DATABASE IF EXISTS portfolio_cms;
CREATE DATABASE portfolio_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_cms;

-- ==========================================
-- Users Table
-- ==========================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Profile Table
-- ==========================================
CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    profession VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_image VARCHAR(255),
    profile_image_public_id VARCHAR(255),
    resume_url VARCHAR(255),
    resume_public_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Skills Table
-- ==========================================
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    icon VARCHAR(255),
    level INT NOT NULL,
    sort_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Projects Table
-- ==========================================
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    image_public_id VARCHAR(255),
    technologies TEXT,
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    status ENUM('Published','Coming Soon','Draft') DEFAULT 'Draft',
    display_order INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Experiences Table
-- ==========================================
CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    location VARCHAR(150),
    employment_type VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    technologies VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Social Links Table
-- ==========================================
CREATE TABLE social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50),
    url VARCHAR(255),
    icon VARCHAR(100),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Contact Messages Table
-- ==========================================
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150),
    subject VARCHAR(200),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Insert Initial Data
-- ==========================================

-- Insert default admin user (username: Addis, password: 0988739524)
-- Note: This is a plain text password for now - you'll need to hash it properly
INSERT INTO users (username, email, password) VALUES 
('Addis', 'addis@gmail.com', '0988739524');

-- Insert profile data
INSERT INTO profile (full_name, profession, bio) VALUES (
    'Addisu Hirbo',
    'Full Stack Developer',
    'Welcome to my portfolio. I am a passionate developer with experience in building modern web applications using React, Node.js, and MySQL.'
);

-- Insert social links
INSERT INTO social_links (platform, url, icon, sort_order) VALUES
('GitHub', 'https://github.com/Addisuch24', 'github', 1),
('LinkedIn', 'https://linkedin.com', 'linkedin', 2),
('Telegram', 'https://t.me', 'telegram', 3),
('Email', 'mailto:addis@gmail.com', 'envelope', 4);

-- Insert skills
INSERT INTO skills (name, category, icon, level, sort_order) VALUES
('JavaScript', 'Frontend', 'javascript', 90, 1),
('React', 'Frontend', 'react', 85, 2),
('Node.js', 'Backend', 'nodejs', 80, 3),
('Express', 'Backend', 'express', 85, 4),
('MySQL', 'Database', 'mysql', 75, 5);

-- Insert sample projects
INSERT INTO projects (title, description, technologies, github_url, live_demo_url, status, display_order) VALUES
('Portfolio CMS', 'A full-stack portfolio content management system built with React and Node.js', 'React, Node.js, Express, MySQL', 'https://github.com/Addisuch24', '', 'Published', 1),
('E-Commerce Platform', 'Modern e-commerce solution with payment integration', 'React, Redux, Node.js, MongoDB', 'https://github.com/Addisuch24', '', 'Coming Soon', 2);

-- Insert sample experiences
INSERT INTO experiences (company, position, location, employment_type, start_date, is_current, description, technologies) VALUES
('Tech Company', 'Full Stack Developer', 'Remote', 'Full-time', '2023-01-01', TRUE, 'Developing and maintaining web applications using modern technologies', 'React, Node.js, MySQL'),
('Freelance', 'Web Developer', 'Remote', 'Contract', '2022-01-01', FALSE, 'Built custom websites for various clients', 'HTML, CSS, JavaScript, PHP');

-- Verify data
SELECT 'Profile Data:' as '';
SELECT * FROM profile;

SELECT 'Skills Data:' as '';
SELECT * FROM skills;

SELECT 'Projects Data:' as '';
SELECT * FROM projects;

SELECT 'Experiences Data:' as '';
SELECT * FROM experiences;

SELECT 'Social Links Data:' as '';
SELECT * FROM social_links;
