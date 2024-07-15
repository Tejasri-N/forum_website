CREATE TABLE USERS_DATA(
    user_id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(60) NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE post(
    post_id BIGSERIAL PRIMARY KEY,
    post_description TEXT NOT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    comment_description TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);
