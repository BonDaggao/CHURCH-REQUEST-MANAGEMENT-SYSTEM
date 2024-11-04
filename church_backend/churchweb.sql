CREATE TABLE Marriage (
    MarriageID INT AUTO_INCREMENT PRIMARY KEY,
    Schedule DATETIME,
    CoupleNames VARCHAR(255),
    Address VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(255),
    PrincipalSponsorsList TEXT,
    ConfirmationCertificate BLOB,
    BaptismalCertificate BLOB,
    PSABirthCertificate BLOB,
    PSACertificateOfNoMarriage BLOB
);
CREATE TABLE Baptism (
    BaptismID INT AUTO_INCREMENT PRIMARY KEY,
    Schedule DATETIME,
    ParentsNames VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(255),
    ChildName VARCHAR(255),
    PrincipalSponsorsList TEXT,
    IndividualOrGroup ENUM('Individual', 'Group'),
    Type ENUM('Adult', 'Infant'),
    MarriageCertificate BLOB,
    ChildBirthCertificate BLOB
);
CREATE TABLE Sacraments (
    SacramentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(255),
    Schedule DATETIME,
    Intent TEXT
);
CREATE TABLE Confirmation (
    ConfirmationID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    ContactNumber VARCHAR(15),
    Email VARCHAR(255),
    Schedule DATETIME,
    Intent TEXT,
    BaptismalCertificate BLOB,
    BirthCertificate BLOB
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
