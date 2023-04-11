CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(20) NOT NULL,
    duration INT NOT NULL,
    price INT NOT NULL
);

DROP TABLE movies;

INSERT INTO
movies(name,category,duration,price)
VALUES
('Exemplo','teste',100,74);

SELECT
*
FROM
movies;

INSERT INTO
movies(name, category, duration, price)
VALUES
('Exemplo3','teste',100,74),
('Exemplo2','teste2',120,84)
RETURNING *;

SELECT
*
FROM
movies
WHERE
name = 'Exemplo';