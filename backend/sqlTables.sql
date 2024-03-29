CREATE TABLE user (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roll CHAR(9) PRIMARY KEY,
    otp VARCHAR(12),
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(10) NOT NULL UNIQUE,
    address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role CHAR(5) DEFAULT 'user',
    password_changed_at TIMESTAMP,
    password_reset_token VARCHAR(255),
    reset_token_expires_in TIMESTAMP,
    is_validated tinyint(1),
    CHECK (CHAR_LENGTH(password) >= 8),
    CHECK (CHAR_LENGTH(phone) = 10),
    CHECK (email LIKE '%@vitstudent.ac.in') 
);

CREATE TABLE favourites (
  user_id CHAR(9),
  product_id VARCHAR(50),
  PRIMARY KEY(user_id, product_id),
  FOREIGN KEY(user_id) REFERENCES user(roll)
  ON DELETE CASCADE
);

CREATE INDEX idx_favourites_user_product ON favourites (user_id, product_id);
