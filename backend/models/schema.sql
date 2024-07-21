-- Create table roles 
CREATE TABLE roles (
    id SERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(255) NOT NULL
);

-- Insert INTO roles 
INSERT INTO roles (role) VALUES ('ADMIN') RETURNING *;
INSERT INTO roles (role) VALUES ('USER') RETURNING *;
INSERT INTO roles (role) VALUES ('SHOP') RETURNING *;

-- Create table permissions
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY NOT NULL,
    permission VARCHAR(255) NOT NULL
);

-- Insert INTO permissions
INSERT INTO permissions (permission) VALUES ('CREATE_PRODUCT') RETURNING *;

-- Create table role_permission
CREATE TABLE role_permission(
    id SERIAL PRIMARY KEY NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id ) REFERENCES roles (id)ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id)ON DELETE CASCADE ON UPDATE CASCADE);
    
-- Insert INTO role_permission
    INSERT INTO role_permission (role_id,permission_id) VALUES (1,1) RETURNING *;

-- Create table users
    CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    firstName VARCHAR(255) ,
    lastName VARCHAR(255) ,
    city VARCHAR(255),
    address VARCHAR(255),
    postal_code VARCHAR(255),
    role_id INT,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
     profile_pic VARCHAR DEFAULT (
        'https://i.pinimg.com/564x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg'
    ),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert INTO users
INSERT INTO users (userName, email, password, country, age, firstName, lastName, city, address, postal_code, role_id) 
VALUES (
    'khaled','khaled@gmail.com','123','jordan',30,'khaled','odeh','amman','123 Makkah Street','12345',1
)RETURNING *;
