/* DROP DATABASE IF EXISTS top_songsDB;
CREATE database top_songsDB;

USE top_songsDB;

CREATE TABLE top5000 (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM top5000;

SELECT COUNT(*) FROM top5000;

SELECT `year`, 
COUNT(*) AS 'Count',
AVG(`raw_total`) AS 'AVG Total',
MIN(`raw_total`) AS 'Min Total',
MAX(`raw_total`) AS 'Max Total',
SUM(`raw_total`) AS 'Sum Total'
FROM top5000 WHERE `YEAR` BETWEEN 1980 AND 1990
GROUP BY `year`;

SELECT*FROM `top5000`
WHERE
 artist IN (
	SELECT
	 `artist`
	FROM top5000
	GROUP BY
	 artist
	HAVING 
	 COUNT(song) = 1)
	 
ORDER BY
  `artist`;
  
SELECT
  artist,
  COUNT(song) AS 'SongCount'
FROM top5000
GROUP BY
  artist
HAVING
  `SongCount`>1
ORDER BY
  `SongCount` DESC;
  
  CREATE TABLE TopAlbums (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  album VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);*/
  CREATE TABLE TopSongs (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
); 


DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL
, product_name VARCHAR(100) NOT NULL
, department_name VARCHAR(100) NOT NULL
, price DECIMAL(10, 2)
, stock_quantity INT
, PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Echo', 'Technology', 64.99, 10), ('Vitamins', 'Health', 10.99, 25), ('Instant Pot', 'Homegoods', 139.99, 5), 
('Drill Kit', 'Tools', 74.99, 2), ('Coffee Pot', 'Homegoods', 25.99, 4), ('Charging Cable', 'Technology', 5.99, 45), ('Dog Treats', 'Pets', 9.99, 6),
('Hammock', 'Outdoor', 25.99, 3), ('Pillow', 'Homegoods', 14.99, 2), ('Grill', 'Outdoor', 499.99, 1);

SELECT * FROM products;

  
 




