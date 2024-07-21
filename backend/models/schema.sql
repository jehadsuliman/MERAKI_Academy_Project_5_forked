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