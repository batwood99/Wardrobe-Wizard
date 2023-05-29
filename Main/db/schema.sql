DROP DATABASE IF EXISTS clothing_db;
CREATE DATABASE clothing_db;

--  I intend to have a table for each type of clothing item. and then a table for all clothing items., the clothing items will have an id 1,2 3 qnd the other tables will have a foreign key of the id of the clothing item.
CREATE TABLE clothing_items (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(45) NULL,
  item_type VARCHAR(45) NULL,
  item_color VARCHAR(45) NULL,
  item_size VARCHAR(45) NULL,
  item_description VARCHAR(45) NULL,
  PRIMARY KEY (id));

CREATE TABLE shirts (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  item_name VARCHAR(45) NULL,
  item_type VARCHAR(45) NULL,
  item_color VARCHAR(45) NULL,
  item_size VARCHAR(45) NULL,
  item_description VARCHAR(45) NULL,
  PRIMARY KEY (id),
  INDEX fk_shirts_clothing_items_idx (item_id ASC) VISIBLE,
  CONSTRAINT fk_shirts_clothing_items
    FOREIGN KEY (item_id)
    REFERENCES clothing_db.clothing_items (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE pants (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    item_name VARCHAR(45) NULL,
    item_type VARCHAR(45) NULL,
    item_color VARCHAR(45) NULL,
    item_size VARCHAR(45) NULL,
    item_description VARCHAR(45) NULL,
    PRIMARY KEY (id),
    INDEX fk_pants_clothing_items1_idx (item_id ASC) VISIBLE,
    CONSTRAINT fk_pants_clothing_items1
        FOREIGN KEY (item_id)
        REFERENCES clothing_db.clothing_items (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION);

CREATE TABLE shoes (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    item_name VARCHAR(45) NULL,
    item_type VARCHAR(45) NULL,
    item_color VARCHAR(45) NULL,
    item_size VARCHAR(45) NULL,
    item_description VARCHAR(45) NULL,
    PRIMARY KEY (id),
    INDEX fk_shoes_clothing_items2_idx (item_id ASC) VISIBLE,
    CONSTRAINT fk_shoes_clothing_items2
        FOREIGN KEY (item_id)
        REFERENCES clothing_db.clothing_items (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION);


