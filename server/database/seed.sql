USE portfolio_cms;

INSERT INTO users(username,email,password)
 values ('Addis','addis@gmail.com','0988739524');
INSERT INTO profile
(full_name, profession, bio)
VALUES
(
'Addisu Hirbo',
'Full Stack Developer',
'Welcome to my portfolio.'
);

INSERT INTO social_links(platform,url,icon,display_order)
VALUES
('GitHub','https://github.com/Addisuch24','github',1),
('LinkedIn','https://linkedin.com','linkedin',2),
('Telegram','https://t.me','telegram',3),
('Email','mailto:example@gmail.com','envelope',4);

INSERT INTO skills(name,icon,display_order)
VALUES
('JavaScript','javascript',1),
('React','react',2),
('Node.js','node',3),
('Express','server',4),
('MySQL','database',5);
