-- Create table roles 
CREATE TABLE roles (
    id SERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(255) NOT NULL
);

-- Insert INTO roles 
INSERT INTO roles (role) VALUES ('ADMIN') RETURNING *;
INSERT INTO roles (role) VALUES ('USER') RETURNING *;
INSERT INTO roles (role) VALUES ('SHOP') RETURNING *;
