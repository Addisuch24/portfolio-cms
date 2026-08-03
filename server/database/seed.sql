USE portfolio_cms;

-- Insert default admin user (password: 0988739524 - change this after first login!)
INSERT INTO users(username, email, password)
VALUES ('Addis', 'addis@gmail.com', '$2b$10$ySb8B8B8B8B8B8B8B8B8B8.eKCfxE0Ly4xZPB8B8B8B8B8B8B8B8');

-- Insert profile data
INSERT INTO profile (full_name, profession, bio)
VALUES (
    'Addisu Hirbo',
    'Full Stack Developer',
    'Welcome to my portfolio. I am a passionate developer with experience in building modern web applications.'
);

-- Insert social links
INSERT INTO social_links(platform, url, icon, sort_order)
VALUES
('GitHub', 'https://github.com/Addisuch24', 'github', 1),
('LinkedIn', 'https://linkedin.com', 'linkedin', 2),
('Telegram', 'https://t.me', 'telegram', 3),
('Email', 'mailto:example@gmail.com', 'envelope', 4);

-- Insert skills
INSERT INTO skills(name, category, level, sort_order)
VALUES
('JavaScript', 'Programming Languages', 90, 1),
('TypeScript', 'Programming Languages', 85, 2),
('Python', 'Programming Languages', 80, 3),
('HTML5 & CSS3', 'Frontend', 95, 4),
('React.js', 'Frontend', 90, 5),
('Bootstrap 5', 'Frontend', 88, 6),
('Node.js', 'Backend', 85, 7),
('Express.js', 'Backend', 85, 8),
('RESTful APIs', 'Backend', 90, 9),
('React Router', 'Frameworks & Libraries', 85, 10),
('Axios', 'Frameworks & Libraries', 88, 11),
('JWT', 'Frameworks & Libraries', 85, 12),
('MySQL', 'Databases', 80, 13),
('MongoDB', 'Databases', 78, 14),
('VS Code', 'Tools & Platforms', 92, 15),
('Postman', 'Tools & Platforms', 88, 16),
('Docker', 'Tools & Platforms', 75, 17),
('Git', 'Version Control', 90, 18),
('GitHub', 'Version Control', 90, 19),
('System Design', 'Software Engineering', 80, 20),
('OOP Principles', 'Software Engineering', 85, 21);
