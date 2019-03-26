-- Add User
INSERT INTO Users (email, password, createdAt, updatedAt) VALUES
('user_1@email.com', 'password', NOW(), NOW()),
('user_2@email.com', 'password', NOW(), NOW());

-- Add Posts
INSERT INTO Posts
(text, description, category, createdAt, updatedAt, UserId) VALUES
('title_1', 'description', 'category_1', NOW(), NOW(), 1),
('title_2', 'description', 'category_1', NOW(), NOW(), 1),
('title_3', 'description', 'category_2', NOW(), NOW(), 2);

-- Add Comments
INSERT INTO Comments (text, createdAt, updatedAt, PostId) VALUES
('comment_1', NOW(), NOW(), 1),
('comment_2', NOW(), NOW(), 2);
