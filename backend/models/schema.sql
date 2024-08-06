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
INSERT INTO permissions (permission) VALUES ('UPDATE_PROFILE') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_SUB_CATEGORIES') RETURNING *;
INSERT INTO permissions (permission) VALUES ('DELETE_SUB_CATEGORIES') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_PRODUCT') RETURNING *;
INSERT INTO permissions (permission) VALUES ('DELETE_PRODUCT') RETURNING *;
INSERT INTO permissions (permission) VALUES ('UPDATE_PRODUCT') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_CATEGORY') RETURNING *;
INSERT INTO permissions (permission) VALUES ('DELETE_CATEGORY') RETURNING *;
INSERT INTO permissions (permission) VALUES ('UPDATE_CATEGORY') RETURNING *;
INSERT INTO permissions (permission) VALUES ('ADD_CART') RETURNING *;
INSERT INTO permissions (permission) VALUES ('DELETE_CART') RETURNING *;
INSERT INTO permissions (permission) VALUES ('UPDATE_CART') RETURNING *;
INSERT INTO permissions (permission) VALUES ('ADD_FAVORITE') RETURNING *;
INSERT INTO permissions (permission) VALUES ('DELETE_FAVORITE') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_ORDER') RETURNING *;
INSERT INTO permissions (permission) VALUES ('CREATE_COMMENT') RETURNING *;
INSERT INTO permissions (permission) VALUES ('DELETE_COMMENT') RETURNING *;
INSERT INTO permissions (permission) VALUES ('EDIT_COMMENT') RETURNING *;


-- Create table role_permission

CREATE TABLE role_permission(
    id SERIAL PRIMARY KEY NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id ) REFERENCES roles (id)ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id)ON DELETE CASCADE ON UPDATE CASCADE);
    
-- Insert INTO role_permission

INSERT INTO role_permission (role_id,permission_id) VALUES (2,1) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (3,1) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (3,2) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (3,3) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (3,4) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (3,5) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (3,6) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (1,7) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (1,8) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (1,9) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,10) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,11) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,12) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,13) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,14) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,15) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,16) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,17) RETURNING *;
INSERT INTO role_permission (role_id,permission_id) VALUES (2,18) RETURNING *;

-- Create table users

       CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    userName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    age INT NOT NULL,
    role_id INT,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
     profile_pic VARCHAR DEFAULT (
        'https://i.pinimg.com/564x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg'
    ),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Insert INTO users

INSERT INTO users (userName, email, password, country,phone_number,age,  role_id) 
VALUES (
    'khaled','khaled@gmail.com','123','jordan','0796959715',30,2
)RETURNING *;

    -- Create table categories

CREATE TABLE categories(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR (255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0
);

-- Insert INTO categories

INSERT INTO categories (name, image,user_id) 
VALUES (
    'clothes', 
    'https://img.ltwebstatic.com/images3_ccc/2024/07/08/d9/17204201252ecdf46dc1460de1f5ebacd6ee208dc1.webp',1)
    RETURNING *;

-- Create table shops

CREATE TABLE shops(
    id SERIAL PRIMARY KEY NOT NULL,
    shopName VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    phone_number VARCHAR(255),
    role_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
     profile_pic VARCHAR DEFAULT (
        'https://i.pinimg.com/564x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg'
    )
);

-- Insert INTO shops

INSERT INTO shops (shopName, country, email, password, description, phone_number, role_id, category_id) 
VALUES (
    'MAX','jordan','max@gmail.com','123','discreption','0796959715',3,1
)RETURNING *;

-- Create table sub_categories

CREATE TABLE sub_categories (
    id SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR (255) NOT NULL,
    shop_id INT NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE ON UPDATE CASCADE,
     is_deleted SMALLINT DEFAULT 0
   );

-- Insert INTO sub_categories

INSERT INTO sub_categories (description, shop_id) 
VALUES ('Smartphones',1)RETURNING *;

-- Create table products

CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT ,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255) DEFAULT 'https://i.pinimg.com/564x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg',
    sub_category_id INT NOT NULL,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0
);

-- Insert INTO products

INSERT INTO products (title, description, price, sub_category_id) 
VALUES ('iPhone 13','iPhone description',999.99, 1)RETURNING *;

-- Create table carts

CREATE TABLE carts(
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

-- Insert INTO carts

INSERT INTO carts (product_id, user_id,quantity,total_price) 
VALUES (1, 1,2,9.99)RETURNING *;

-- Create table shipping address

CREATE TABLE shipping_address(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    address_type INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

-- Insert INTO shipping address

INSERT INTO shipping_address (first_name, last_name,address,city,country,postal_code,address_type,user_id) 
VALUES ('jehad','suliman','makkah street','amman','jordan','4523',1,1)RETURNING *;

-- Create table orders

CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    carts_id INT NOT NULL,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    FOREIGN KEY (carts_id) REFERENCES carts (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (address_id) REFERENCES shipping_address(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0,
    ordered_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

-- Insert INTO orders

INSERT INTO orders (carts_id, user_id,address_id) 
VALUES (1,1,1)RETURNING *;

-- Create table comment_rate

CREATE TABLE comment_rate(
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    comment VARCHAR(255),
    rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert INTO comment_rate

INSERT INTO comment_rate (product_id, user_id,comment,rating) 
VALUES (1,1,'hi',3)RETURNING *;

-- Create table favorite

CREATE TABLE favorite (
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_deleted SMALLINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert INTO favorite

INSERT INTO favorite (product_id, user_id) 
VALUES (1,1)RETURNING *;
