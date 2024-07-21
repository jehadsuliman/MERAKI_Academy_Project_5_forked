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
    
    -- Create table categories
CREATE TABLE categories(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR (255),
    is_deleted SMALLINT DEFAULT 0
);

-- Insert INTO categories
INSERT INTO categories (name, image) 
VALUES (
    'clothes', 
    'https://img.ltwebstatic.com/images3_ccc/2024/07/08/d9/17204201252ecdf46dc1460de1f5ebacd6ee208dc1.webp')
    RETURNING *;
