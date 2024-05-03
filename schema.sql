DROP TABLE IF EXISTS books;
CREATE TABLE IF NOT EXISTS books (
	title VARCHAR(100),
	isbn VARCHAR(13),
	author VARCHAR(100),
    genre VARCHAR(100),
    number_of_pages SMALLINT,
    publication_year SMALLINT,
    user_id SERIAL
);
INSERT INTO books (title, isbn, author, genre, number_of_pages, publication_year, user_id) VALUES ('Hello World', '1234567891011', 'Luvesh', 'Tutorial', 300, 2023, 1);
