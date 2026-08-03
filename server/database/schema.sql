 -- ==========================================
-- Portfolio CMS Database Schema
-- Author: Addisuch24
-- ==========================================

CREATE DATABASE IF NOT EXISTS portfolio_cms
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE portfolio_cms;

-- ==========================================
-- Users
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Profile
-- ==========================================

CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    profession VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_image VARCHAR(255),
    profile_image_public_id VARCHAR(255),
    resume_url VARCHAR(255),
    resume_public_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Skills
-- ==========================================
CREATE TABLE skills(

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    category VARCHAR(100) NOT NULL,

    description TEXT DEFAULT NULL,

    icon VARCHAR(255),

    level INT NOT NULL,

    sort_order INT DEFAULT 0,

    status VARCHAR(20) DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ==========================================
-- Projects
-- ==========================================

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    image_public_id VARCHAR(255),
    technologies TEXT,
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
     status ENUM('Published','Coming Soon','Draft')
        DEFAULT 'Draft',
    display_order INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- Experiences
-- ==========================================

CREATE TABLE  IF NOT EXISTS experiences(

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

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

-- ==========================================
-- Social Links
-- ==========================================

CREATE TABLE IF NOT EXISTS social_links(

    id INT AUTO_INCREMENT PRIMARY KEY,

    platform VARCHAR(50),

    url VARCHAR(255),

    icon VARCHAR(100),

    sort_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- Contact Messages
-- ==========================================

CREATE TABLE  IF NOT EXISTS contacts(

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100),

    email VARCHAR(150),

    subject VARCHAR(200),

    message TEXT,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);