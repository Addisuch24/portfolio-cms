-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2026 at 05:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio_cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`) VALUES
(1, 'Test', 'test@example.com', 'Test', 'Hello', 1, '2026-08-01 08:31:33'),
(2, 'Test', 'test@example.com', 'Test', 'Hello', 1, '2026-08-01 08:32:08'),
(3, 'Hamid', 'addisuch955@gmail.com', 'HI', 'are you fine', 1, '2026-08-01 08:33:56'),
(4, 'hg', 'addisuch955@gmail.com', 'jhg', 'yfhn', 1, '2026-08-01 09:40:36'),
(5, 'R', 'addisuch955@gmail.com', 'good ', 'zuhur ', 1, '2026-08-01 09:50:04'),
(7, 'Addis H', 'edrishassen86@gmail.com', 'just', 'how r u?', 1, '2026-08-04 12:42:58'),
(8, 'client', 'edrishassen86@gmail.com', 'collaboration', '# ==========================\n# Database Configuration\n# ==========================\nDB_HOST=localhost\nDB_PORT=3306\nDB_NAME=portfolio_cms\nDB_USER=root\nDB_PASSWORD=\n\n# ==========================\n# JWT Configuration\n# ==========================\nJWT_SECRET=your_super_secret_jwt_key\n\n# ==========================\n# Cloudinary Configuration\n# ==========================\nCLOUDINARY_CLOUD_NAME=your_cloud_name\nCLOUDINARY_API_KEY=your_api_key\nCLOUDINARY_API_SECRET=your_api_secret\n\n# ==========================\n# Email Configuration (Gmail SMTP)\n# ==========================\nEMAIL_HOST=smtp.gmail.com\nEMAIL_PORT=587\nEMAIL_SECURE=false\n\nEMAIL_USER=edrishusesa@gmail.com\nEMAIL_PASSWORD=your_16_character_gmail_app_password\n\nEMAIL_FROM=\"Portfolio CMS <edrishusesa@gmail.com>\"\nEMAIL_TO=edrishusesa@gmail.com', 1, '2026-08-05 08:45:19'),
(9, 'Addisu Hirbo', 'edrishassen@gmail.com', 'collaboration', 'byzg vvtj xahk xdax', 1, '2026-08-05 08:52:41'),
(10, 'Addisu Hirbo', 'edrishassen@gmail.com', 'lkjhg', 'CLOUDINARY_CLOUD_NAME=portfolio-cms\nCLOUDINARY_API_KEY=abcdefghijklmnopqrstuvwxyz\nCLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz', 1, '2026-08-05 09:00:30'),
(11, 'Addisu Hirbo', 'edrishassen@gmail.com', 'lkjhgf', 'lkjhjg', 1, '2026-08-05 09:08:46'),
(12, 'Addisu Hirbo', 'edrishassen@gmail.com', 'lkjhg', 'bnm,.', 1, '2026-08-05 09:14:58'),
(13, 'Addisu Hirbo', 'edrishassen@gmail.com', ';lkj', '\';lkjh', 1, '2026-08-05 09:45:25'),
(14, 'client 1', 'edrishassen86@gmail.com', 'collaboration', 'DB_HOST=localhost\nDB_USER=root\nDB_PASSWORD=\nDB_NAME=portfolio_cms\nDB_PORT=3306\n\nCLOUDINARY_CLOUD_NAME=portfolio-cms\nCLOUDINARY_API_KEY=abcdefghijklmnopqrstuvwxyz\nCLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz\n\nEMAIL_HOST=smtp.gmail.com\nEMAIL_PORT=587\nEMAIL_SECURE=false\n\nEMAIL_USER=edrishusesa@gmail.com\nEMAIL_PASSWORD=YOUR_NEW_APP_PASSWORD_WITHOUT_SPACES\n\nEMAIL_FROM=Portfolio CMS <edrishusesa@gmail.com>\nEMAIL_TO=edrishusesa@gmail.com', 1, '2026-08-05 09:51:45'),
(15, 'Addisu Hirbo', 'edrishusesa@gmail.com', 'collaboration', 'Azan', 1, '2026-08-05 15:47:09'),
(16, 'Addisu Hirbo', 'edrishassen86@gmail.com', 'collaboration', 'If you don\'t have a Cloudinary account, follow these steps.\n\n## Step 1: Create a Cloudinary Account\n\n1. Open: **[https://cloudinary.com/](https://cloudinary.com/)**\n2. Click **Sign Up for Free**.\n3. Sign up using:\n\n   * Google account (recommended), or\n   * GitHub, or\n   * Email and password.\n4. Verify your email if prompted.\n\n---\n\n## Step 2: Open the Dashboard\n\nAfter logging in, you\'ll be taken to the **Dashboard**.\n\nYou will see something similar to:\n\n```\nCloud Name\nportfolio-cms-abc\n\nAPI Key\n123456789012345\n\nAPI Secret\n************************\n```\n\nClick the **eye icon** next to **API Secret** to reveal it.\n\n---\n\n## Step 3: Copy the Credentials\n\nCopy these three values:\n\n* **Cloud Name**\n* **API Key**\n* **API Secret**\n\n---\n\n## Step 4: Update your `.env`\n\nReplace the placeholder values:\n\n```env\nCLOUDINARY_CLOUD_NAME=your_cloud_name\nCLOUDINARY_API_KEY=your_api_key\nCLOUDINARY_API_SECRET=your_api_secret\n```\n\nFor example:\n\n```env\nCLOUDINARY_CLOUD_NAME=portfolio-cms-abc\nCLOUDINARY_API_KEY=123456789012345\nCLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz\n```\n\n> Use your own values, not these examples.\n\n---\n\n## Step 5: Restart the Backend\n\nRun:\n\n```bash\nnpm run dev\n```\n\nor\n\n```bash\nnpm start\n```\n\n---\n\n## Step 6: Test\n\n1. Open your Portfolio CMS Admin.\n2. Upload a profile image or project image.\n3. If everything is configured correctly, the image will upload successfully and its URL will be stored in your database.\n\n---\n\n## Free Plan\n\nThe Cloudinary **Free** plan is sufficient for a personal portfolio CMS. It includes generous monthly storage and bandwidth, making it suitable for profile images, project screenshots, and other portfolio assets.\n\nIf you get stuck during signup or configuration, send me a screenshot of the Cloudinary Dashboard, and I\'ll point out exactly which values to copy into your `.env`.\n', 1, '2026-08-05 17:39:12'),
(17, 'Addisu Hirbo', 'edrishusesa@gmail.com', 'collaboration', 'bcmq neym welm gdif\n', 1, '2026-08-05 18:11:36'),
(18, 'Addisu Hirbo', 'edrishusesa@gmail.com', 'collaboration', 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 1, '2026-08-06 17:28:51'),
(22, 'fgh', 'edrishaees86@gmail.com', 'just', 'thanks', 1, '2026-08-11 13:05:26'),
(23, 'jj', '4@gmail.com', 'jj', 'uoytrdf', 1, '2026-08-11 13:06:20'),
(24, 'Addisu Hirbo', 'edrishassen86@gmail.com', 'collaboration', 'Asalam waleykum', 1, '2026-08-13 07:34:54'),
(25, 'Addisu Hirbo', 'edrishusesa@gmail.com', 'collaboration', 'As Wa Wr Wb', 1, '2026-08-13 08:27:19'),
(26, 'Addisu Hirbo', 'edrishassen86@gmail.com', 'collaboration', 'Hi', 0, '2026-08-16 09:44:05');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_current` tinyint(1) DEFAULT 0,
  `display_order` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `location` varchar(150) DEFAULT NULL,
  `employment_type` varchar(50) DEFAULT NULL,
  `technologies` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `company`, `position`, `description`, `start_date`, `end_date`, `is_current`, `display_order`, `created_at`, `updated_at`, `location`, `employment_type`, `technologies`) VALUES
(1, 'haramaya', 'student', 'software engineering student', '2026-03-24', '0000-00-00', 1, 1, '2026-07-30 12:39:57', '2026-07-30 12:39:57', 'maya', 'part time', 'react'),
(4, 'cursor hackaton', 'student/participant', 'Eas ethiopian universities cursor hackaton participation', '2026-02-22', '0000-00-00', 1, 1, '2026-08-05 08:05:41', '2026-08-05 08:05:41', 'Haramaya university', 'for 2days', 'Web developer'),
(5, 'cursor hackaton', 'sssssssssssssssss', 'sssssssssssssssssssssss', '0000-00-00', '0000-00-00', 1, 1, '2026-08-05 15:43:17', '2026-08-05 15:43:17', 'ssssssssssssssssssssssssssssssss', 'sssssssssssssssssssssssssss', 'ssssssssssssssssssssssssss');

-- --------------------------------------------------------

--
-- Table structure for table `professional_skills`
--

CREATE TABLE `professional_skills` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(100) DEFAULT 'bi-lightbulb',
  `percentage` int(11) DEFAULT 85,
  `display_order` int(11) DEFAULT 1,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `profession` varchar(100) NOT NULL,
  `bio` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `profile_image_public_id` varchar(255) DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `resume_public_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `full_name`, `profession`, `bio`, `email`, `phone`, `address`, `profile_image`, `profile_image_public_id`, `resume_url`, `resume_public_id`, `created_at`, `updated_at`) VALUES
(1, 'Addisu Hirbo', 'Software Engineering Student & Full-Stack Developer', 'I\'m Addisu Hirbo, a Software Engineering student with a passion for building modern web and mobile applications. I enjoy transforming ideas into practical, user-friendly solutions using technologies such as React, JavaScript, Node.js, Express.js, MySQL, PHP, and  CSS.\n\nI have experience developing full-stack applications, REST APIs, responsive websites, and database-driven systems. I enjoy learning new technologies, solving real-world problems, and continuously improving my software development skills.\n', 'edrishusesa@gmail.com', '0988739524', 'Ethiopia', 'https://res.cloudinary.com/d9bj1enk/image/upload/v1785944039/portfolio/profile/ag7km0milbhdac3bnztc.jpg', 'portfolio/profile/ag7km0milbhdac3bnztc', 'http://localhost:5000/uploads/1785424957604-pra.pdf', NULL, '2026-07-24 17:21:21', '2026-08-05 15:34:00'),
(2, 'Addisu Hirbo', 'Full Stack Developer', 'Welcome to my portfolio.', 'addis@gmail.com', '+1 (555) 123-4567', 'San Francisco, CA', NULL, NULL, NULL, NULL, '2026-07-24 18:21:48', '2026-08-03 14:47:11');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `technologies` text DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `live_demo_url` varchar(255) DEFAULT NULL,
  `status` enum('Published','Coming Soon','Draft') DEFAULT 'Draft',
  `display_order` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_public_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `technologies`, `github_url`, `live_demo_url`, `status`, `display_order`, `created_at`, `updated_at`, `image_public_id`) VALUES
(1, 'Portfolio CMS', 'Enterprise Portfolio', 'http://localhost:5000/uploads/1785401777092-photo_2026-02-27_10-57-20.jpg', 'React,Node,Express,MySQL', 'https://github.com/Addisuch24/portfolio-cms', 'https://example.com', 'Coming Soon', 1, '2026-07-25 13:11:15', '2026-07-30 08:56:17', NULL),
(7, 'kj', 'jhgf', 'http://localhost:5000/uploads/1785916147830-RestApi.jpg,http://localhost:5000/uploads/1785916147830-CSS.jpg', 'hjg', 'https://github.com/Addisuch24/Gaho', 'https://github.com/Addisuch24/Gaho', 'Coming Soon', 1, '2026-07-30 11:24:25', '2026-08-05 07:49:31', NULL),
(8, 'goho', 'oromian entetainment', 'http://localhost:5000/uploads/1785410829941-photo_2026-02-27_10-57-20 (2).jpg,http://localhost:5000/uploads/1785916030109-SQL.jpg,http://localhost:5000/uploads/1785916030110-Vite.jpg', 'react', 'https://github.com/Addisuch24/Gaho', 'https://github.com/Addisuch24/Gaho', 'Published', 1, '2026-07-30 11:27:09', '2026-08-05 07:47:10', NULL),
(9, 'project 3', 'pro   3', 'http://localhost:5000/uploads/1785913814242-DatabaseDesign.jpg,http://localhost:5000/uploads/1785913967971-communication.jpg,http://localhost:5000/uploads/1785913982036-vscode.jpg', 'java', 'https://github.com/Addisuch24/pro3', 'http://localhost:5173/admin/projects/create', 'Published', 1, '2026-08-01 08:07:59', '2026-08-05 07:13:02', NULL),
(11, 'project 4', 'test', 'https://res.cloudinary.com/d9bj1enk/image/upload/v1785944441/portfolio/projects/ewv2rb0nhjzoaow4oaxb.jpg', 'ssssssssssssssssssssssssss', 'https://github.com/Addisuch24/Gaho', 'http://localhost:5173/admin/projects/create', 'Published', 1, '2026-08-05 15:40:42', '2026-08-05 15:40:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT 50,
  `sort_order` int(11) DEFAULT 0,
  `status` varchar(20) DEFAULT 'Active',
  `display_order` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `category`, `description`, `icon`, `level`, `sort_order`, `status`, `display_order`, `created_at`, `updated_at`) VALUES
(26, 'CSS3', 'Frontend', 'Designing responsive layouts with modern styling techniques.', '/uploads/images/1785740679219.jpg', 50, 0, 'Active', 1, '2026-08-03 07:04:39', '2026-08-03 08:52:57'),
(27, 'JavaScript', 'Frontend', 'Developing interactive and dynamic web experiences', '/uploads/images/1785740754691.jpg', 50, 0, 'Active', 1, '2026-08-03 07:05:54', '2026-08-03 08:19:14'),
(28, 'React', 'Frontend', 'Building reusable component-based user interfaces', '/uploads/images/1785740811512.jpg', 50, 0, 'Active', 1, '2026-08-03 07:06:51', '2026-08-03 08:19:41'),
(29, 'Bootstrap 5', 'Frontend', 'Creating responsive layouts with efficient UI components.', '/uploads/images/1785864191341.jpg', 50, 0, 'Active', 1, '2026-08-03 07:09:33', '2026-08-04 17:23:11'),
(30, 'Node.js', 'Backend', 'Developing scalable server-side applications and APIs.', '/uploads/images/1785741058387.jpg', 50, 0, 'Active', 1, '2026-08-03 07:10:58', '2026-08-03 08:20:59'),
(31, 'Express.js', 'Backend', 'Building secure and structured RESTful APIs.', '/uploads/images/1785741103864.jpg', 50, 0, 'Active', 1, '2026-08-03 07:11:43', '2026-08-03 08:21:30'),
(32, 'REST API', 'Backend', 'Designing and integrating structured communication between frontend and backend systems', '/uploads/images/1785741183631.jpg', 50, 0, 'Active', 1, '2026-08-03 07:13:03', '2026-08-03 08:30:43'),
(33, 'JWT Authentication', 'Backend', 'Implementing authentication and authorization systems. ', '/uploads/images/1785741241469.jpg', 50, 0, 'Active', 1, '2026-08-03 07:14:01', '2026-08-03 08:24:41'),
(34, 'MySQL', 'Databases', 'Designing relational databases and managing structured data.', '/uploads/images/1785741294049.jpg', 50, 0, 'Active', 1, '2026-08-03 07:14:54', '2026-08-03 08:26:04'),
(35, 'SQL', 'Databases', 'Writing queries and managing efficient data operations.', '/uploads/images/1785741315094.jpg', 50, 0, 'Active', 1, '2026-08-03 07:15:15', '2026-08-03 08:31:14'),
(36, 'Database Design', 'Databases', NULL, '/uploads/images/1785741341375.jpg', 100, 0, 'Active', 1, '2026-08-03 07:15:41', '2026-08-03 07:15:41'),
(37, 'Git', 'Tools & Platforms', 'Managing source code versions and collaborating through efficient workflows.', '/uploads/images/1785746390689.jpg', 50, 0, 'Active', 1, '2026-08-03 07:54:02', '2026-08-03 08:39:50'),
(38, 'GitHub', 'Tools & Platforms', 'Hosting repositories and managing collaborative software development.', '/uploads/images/1785922916342.png', 50, 0, 'Active', 1, '2026-08-03 07:54:31', '2026-08-05 09:41:56'),
(39, 'Postman', 'Tools & Platforms', 'Testing, debugging, and documenting APIs.', '/uploads/images/1785743717043.jpg', 50, 0, 'Active', 1, '2026-08-03 07:55:17', '2026-08-03 08:40:58'),
(40, 'Figma', 'Tools & Platforms', NULL, 'bi-file-earmark-code', 100, 0, 'Active', 1, '2026-08-03 07:56:45', '2026-08-03 07:56:45'),
(41, 'VS Code', 'Tools & Platforms', 'Developing applications using a powerful and customizable coding environment.', '/uploads/images/1785743828552.jpg', 50, 0, 'Active', 1, '2026-08-03 07:57:08', '2026-08-03 08:41:21'),
(42, 'Vite', 'Tools & Platforms', '', '/uploads/images/1785864314529.jpg', 50, 0, 'Active', 1, '2026-08-03 07:58:11', '2026-08-04 17:25:14'),
(43, 'HTML5', 'Frontend', 'Creating semantic and accessible web structures.', '/uploads/images/1785745044594.jpg', 50, 0, 'Active', 1, '2026-08-03 08:17:24', '2026-08-03 08:17:24'),
(44, 'Axios', 'Frameworks & Libraries', 'Connecting frontend applications with backend APIs', '/uploads/images/1785864091066.jpg', 50, 0, 'Active', 1, '2026-08-03 08:32:34', '2026-08-04 17:21:31'),
(45, 'Bootstrap 5', 'Frameworks & Libraries', '', '/uploads/images/1785864210585.jpg', 50, 0, 'Active', 1, '2026-08-03 08:37:13', '2026-08-04 17:23:30'),
(46, 'React', 'Frameworks & Libraries', '', '/uploads/images/1785746259139.jpg', 50, 0, 'Active', 1, '2026-08-03 08:37:39', '2026-08-03 08:37:39'),
(47, 'Express', 'Frameworks & Libraries', '', '/uploads/images/1785746301855.jpg', 50, 0, 'Active', 1, '2026-08-03 08:38:21', '2026-08-03 08:38:21'),
(62, 'Problem Solving', 'Soft Skill', 'Analyzing challenges and creating efficient software solutions.', '/uploads/images/1785864394053.jpg', 50, 0, 'Active', 1, '2026-08-03 09:09:20', '2026-08-04 17:26:34'),
(63, 'Communication', 'Soft Skill', '\r\nClearly sharing ideas and collaborating effectively with teams.', '/uploads/images/1785864523330.jpg', 50, 0, 'Active', 1, '2026-08-03 09:09:49', '2026-08-04 17:28:43'),
(64, 'Teamwork', 'Soft Skill', 'Working collaboratively to achieve shared development goals.', '/uploads/images/1785864499081.jpg', 50, 0, 'Active', 1, '2026-08-03 09:10:15', '2026-08-04 17:28:19'),
(65, 'Critical Thinking', 'Soft Skill', 'Evaluating problems carefully and making effective technical decisions.', '/uploads/images/1785864468298.jpg', 50, 0, 'Active', 1, '2026-08-03 09:10:42', '2026-08-04 17:27:48'),
(66, 'Adaptability', 'Soft Skill', 'Quickly learning new technologies and adapting to changing requirements.', '/uploads/images/1785864445662.jpg', 50, 0, 'Active', 1, '2026-08-03 09:11:09', '2026-08-04 17:27:25'),
(67, 'Continuous Learning', 'Soft Skill', 'Improving skills through constant exploration and learning.', '/uploads/images/1785864426531.jpg', 50, 0, 'Active', 1, '2026-08-03 09:11:28', '2026-08-04 17:27:06');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `platform` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `display_order` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `platform`, `url`, `icon`, `sort_order`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 'GitHub', 'https://github.com/Addisuch24', 'github', 0, 1, '2026-07-24 17:21:21', '2026-07-24 17:21:21'),
(2, 'LinkedIn', 'https://linkedin.com', 'linkedin', 0, 2, '2026-07-24 17:21:21', '2026-07-24 17:21:21'),
(4, 'Email', 'https://edrishusesa@gmail.com', 'envelope', 0, 4, '2026-07-24 17:21:21', '2026-08-01 17:14:29'),
(10, 'Telegram', 'https://.tme.@edris_has', 'telegram', 0, 1, '2026-07-30 12:55:37', '2026-07-30 12:55:37'),
(11, 'tiktok', 'http://localhost:5173/admin/social/create', 'twitter', 0, 1, '2026-08-05 15:43:54', '2026-08-05 15:43:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(5, 'addisu', 'addisu@gmail.com', '$2b$10$fTBe2OzQPa0dG.NDrn7TZOgRipGzgLNYmXxyjEnHuwG4xJqNyX58q', 'admin', '2026-07-24 18:02:33', '2026-08-06 21:46:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `professional_skills`
--
ALTER TABLE `professional_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_projects_created_at` (`created_at`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `professional_skills`
--
ALTER TABLE `professional_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
