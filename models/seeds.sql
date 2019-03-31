USE projecttwo;

-- Add User
-- INSERT INTO Users (name, email, password, createdAt, updatedAt) VALUES
-- ('user_1', 'user_1@email.com', 'password', NOW(), NOW()),
-- ('user_2', 'user_2@email.com', 'password', NOW(), NOW());

-- Add Posts
-- INSERT INTO Posts
-- (text, description, category, createdAt, updatedAt, UserId) VALUES
-- ('title_1', 'description', 'category_1', NOW(), NOW(), 1),
-- ('title_2', 'description', 'category_1', NOW(), NOW(), 1),
-- ('title_3', 'description', 'category_2', NOW(), NOW(), 2);

-- Add Comments
-- INSERT INTO Comments (text, name, createdAt, updatedAt, PostId, UserId) VALUES
-- ('comment_1', 'user_1', NOW(), NOW(), 1, 1),
-- ('comment_2', 'user_1', NOW(), NOW(), 2, 1);

-- Categories to select from
INSERT INTO Posts
(text, description, category, createdAt, updatedAt, UserId) VALUES
(null, null, 'Current Events', NOW(), NOW(), 1),
(null, null, 'News', NOW(), NOW(), 1),
(null, null, 'Sports', NOW(), NOW(), 1),
(null, null, 'Video Games', NOW(), NOW(), 1),
(null, null, 'Movies', NOW(), NOW(), 1),
(null, null, 'TV Shows', NOW(), NOW(), 1),
(null, null, 'Fashion', NOW(), NOW(), 1),
(null, null, 'Cooking', NOW(), NOW(), 1);





