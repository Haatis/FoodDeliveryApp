DROP DATABASE IF EXISTS Woltora;
CREATE DATABASE Woltora;
USE Woltora;

CREATE TABLE Cities (
    CityID INT NOT NULL AUTO_INCREMENT,
    CityName VARCHAR(50) NOT NULL,
    CityImage VARCHAR(255) NOT NULL,
    PRIMARY KEY (CityID)
);

CREATE TABLE Restaurants (
    RestaurantID INT NOT NULL AUTO_INCREMENT,
    RestaurantName VARCHAR(50) NOT NULL,
    RestaurantImage VARCHAR(255) NOT NULL,
    CityID INT NOT NULL,
    PRIMARY KEY (RestaurantID),
    FOREIGN KEY (CityID) REFERENCES Cities(CityID)
);

CREATE TABLE Menu (
    MenuID INT NOT NULL AUTO_INCREMENT,
    MenuName VARCHAR(50) NOT NULL,
    MenuPrice DECIMAL(10,2) NOT NULL,
    MenuImage VARCHAR(255) NOT NULL,
    RestaurantID INT NOT NULL,
    PRIMARY KEY (MenuID),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
);

CREATE TABLE users (
    UserID INT NOT NULL AUTO_INCREMENT,
    UserEmail VARCHAR(50) NOT NULL,
    UserPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY (UserID)
);

CREATE TABLE orders (
    OrderID INT NOT NULL AUTO_INCREMENT,
    OrderDate DATETIME NOT NULL,
    OrderTotal DECIMAL(10,2) NOT NULL,
    OrderItems VARCHAR(255) NOT NULL,
    RestaurantName VARCHAR(255) NOT NULL,
    UserID INT NOT NULL,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (UserID) REFERENCES users(UserID)
    
);

INSERT INTO Cities (CityName, CityImage)
VALUES 
    ('Helsinki', 'Helsinki.jpg'), 
    ('Oulu', 'Oulu.jpg'), 
    ('Turku', 'Turku.jpg'), 
    ('Tampere', 'Tampere.jpg'), 
    ('Kuopio', 'Kuopio.jpg'), 
    ('Jyväskylä', 'Jyväskylä.jpg'), 
    ('Mikkeli', 'Mikkeli.jpg'), 
    ('Kajaani', 'Kajaani.jpg');

INSERT INTO Restaurants (RestaurantName, RestaurantImage, CityID)
VALUES 
    ('Helsinki Kebab', 'Kebab.jpg', 1),
    ('Helsinki Hampurilainen', 'Hampurilainen.jpg', 1),
    ('Helsinki Pizza', 'Pizza.jpg', 1),
    ('Oulu Kebab', 'Kebab.jpg', 2),
    ('Oulu Hampurilainen', 'Hampurilainen.jpg', 2),
    ('Oulu Pizza', 'Pizza.jpg', 2),
    ('Turku Kebab', 'Kebab.jpg', 3),
    ('Turku Hampurilainen', 'Hampurilainen.jpg', 3),
    ('Turku Pizza', 'Pizza.jpg', 3),
    ('Tampere Kebab', 'Kebab.jpg', 4),
    ('Tampere Hampurilainen', 'Hampurilainen.jpg', 4),
    ('Tampere Pizza', 'Pizza.jpg', 4),
    ('Kuopio Kebab', 'Kebab.jpg', 5),
    ('Kuopio Hampurilainen', 'Hampurilainen.jpg', 5),
    ('Kuopio Pizza', 'Pizza.jpg', 5),
    ('Jyväskylä Kebab', 'Kebab.jpg', 6),
    ('Jyväskylä Hampurilainen', 'Hampurilainen.jpg', 6),
    ('Jyväskylä Pizza', 'Pizza.jpg', 6),
    ('Mikkeli Kebab', 'Kebab.jpg', 7),
    ('Mikkeli Hampurilainen', 'Hampurilainen.jpg', 7),
    ('Mikkeli Pizza', 'Pizza.jpg', 7),
    ('Kajaani Kebab', 'Kebab.jpg', 8),
    ('Kajaani Hampurilainen', 'Hampurilainen.jpg', 8),
    ('Kajaani Pizza', 'Pizza.jpg', 8);

INSERT INTO Menu (MenuName, MenuPrice, MenuImage, RestaurantID)
VALUES
('Kebab Ranskalaiset', 9.00, 'kebab1.jpg', 1),
('Kebab Rulla', 10.00, 'kebab2.jpg', 1),
('Kebab Iskender', 11.00, 'kebab3.jpg', 1),
('Hampurilainen', 9.00, 'hamburger1.jpg', 2),
('Kerroshampurilainen', 10.00, 'hamburger2.jpg', 2),
('HampurilaisAteria', 11.00, 'hamburger3.jpg', 2),
('Pizza Salami', 9.00, 'pizza1.jpg', 3),
('Pizza Kebab', 10.00, 'pizza2.jpg', 3),
('Pizza Kinkku', 11.00, 'pizza3.jpg', 3),
('Kebab Ranskalaiset', 12.00, 'kebab1.jpg', 4),
('Kebab Rulla', 13.00, 'kebab2.jpg', 4),
('Kebab Iskender', 14.00, 'kebab3.jpg', 4),
('Hampurilainen', 10.00, 'hamburger1.jpg', 5),
('Kerroshampurilainen', 11.00, 'hamburger2.jpg', 5),
('HampurilaisAteria', 12.00, 'hamburger3.jpg', 5),
('Pizza Salami', 10.00, 'pizza1.jpg', 6),
('Pizza Kebab', 11.00, 'pizza2.jpg', 6),
('Pizza Kinkku', 12.00, 'pizza3.jpg', 6),
('Kebab Ranskalaiset', 9.00, 'kebab1.jpg', 7),
('Kebab Rulla', 10.00, 'kebab2.jpg', 7),
('Kebab Iskender', 11.00, 'kebab3.jpg', 7),
('Hampurilainen', 9.00, 'hamburger1.jpg', 8),
('Kerroshampurilainen', 10.00, 'hamburger2.jpg', 8),
('HampurilaisAteria', 11.00, 'hamburger3.jpg', 8),
('Pizza Salami', 9.00, 'pizza1.jpg', 9),
('Pizza Kebab', 10.00, 'pizza2.jpg', 9),
('Pizza Kinkku', 11.00, 'pizza3.jpg', 9),
('Kebab Ranskalaiset', 12.00, 'kebab1.jpg', 10),
('Kebab Rulla', 13.00, 'kebab2.jpg', 10),
('Kebab Iskender', 14.00, 'kebab3.jpg', 10),
('Hampurilainen', 10.00, 'hamburger1.jpg', 11),
('Kerroshampurilainen', 11.00, 'hamburger2.jpg', 11),
('HampurilaisAteria', 12.00, 'hamburger3.jpg', 11),
('Pizza Salami', 10.00, 'pizza1.jpg', 12),
('Pizza Kebab',9.00 ,'pizza2.jpg', 12),
('Pizza Kinkku',10.00, 'pizza3.jpg', 12),
('Kebab Ranskalaiset',12.00, 'kebab1.jpg', 13),
('Kebab Rulla',9.00, 'kebab2.jpg', 13),
('Kebab Iskender',12.00, 'kebab3.jpg', 13),
('Hampurilainen',11.00, 'hamburger1.jpg', 14),
('Kerroshampurilainen',9.00, 'hamburger2.jpg', 14),
('HampurilaisAteria',11.00, 'hamburger3.jpg', 14),
('Pizza Salami',12.00, 'pizza1.jpg', 15),
('Pizza Kebab',9.00, 'pizza2.jpg', 15),
('Pizza Kinkku',12.00, 'pizza3.jpg', 15),
('Kebab Ranskalaiset',13.00, 'kebab1.jpg', 16),
('Kebab Rulla',9.00, 'kebab2.jpg', 16),
('Kebab Iskender',10.00, 'kebab3.jpg', 16),
('Hampurilainen',11.00, 'hamburger1.jpg', 17),
('Kerroshampurilainen',12.00, 'hamburger2.jpg', 17),
('HampurilaisAteria',9.00, 'hamburger3.jpg', 17),
('Pizza Salami',12.00, 'pizza1.jpg', 18),
('Pizza Kebab',11.00, 'pizza2.jpg', 18),
('Pizza Kinkku',13.00, 'pizza3.jpg', 18),
('Kebab Ranskalaiset',12.50, 'kebab1.jpg', 19),
('Kebab Rulla',10.00, 'kebab2.jpg', 19),
('Kebab Iskender',9.00, 'kebab3.jpg', 19),
('Hampurilainen',12.00, 'hamburger1.jpg', 20),
('Kerroshampurilainen',13.00, 'hamburger2.jpg', 20),
('HampurilaisAteria',9.00, 'hamburger3.jpg', 20),
('Pizza Salami',10.00, 'pizza1.jpg', 21),
('Pizza Kebab',12.00, 'pizza2.jpg', 21),
('Pizza Kinkku',11.00, 'pizza3.jpg', 21),
('Kebab Ranskalaiset',12.00, 'kebab1.jpg', 22),
('Kebab Rulla',11.00, 'kebab2.jpg', 22),
('Kebab Iskender',10.50, 'kebab3.jpg', 22),
('Hampurilainen',9.00, 'hamburger1.jpg', 23),
('Kerroshampurilainen',12.00, 'hamburger2.jpg', 23),
('HampurilaisAteria',11.00, 'hamburger3.jpg', 23),
('Pizza Salami',9.00, 'pizza1.jpg', 24),
('Pizza Kebab',12.00, 'pizza2.jpg', 24),
('Pizza Kinkku',13.00, 'pizza3.jpg', 24);

