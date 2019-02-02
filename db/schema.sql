DROP DATABASE IF EXISTS notetaker_db;

CREATE DATABASE notetaker_db;

USE notetaker_db;

CREATE TABLE notes (
  id INTEGER(5) NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  note_text TEXT(5000) NOT NULL,
  PRIMARY KEY(id)
);