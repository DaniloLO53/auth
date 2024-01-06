DROP TABLE IF EXISTS admins;

CREATE TABLE IF NOT EXISTS admins (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	is_super BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP
);

INSERT INTO admins(username, password, email, is_super)
VALUES ('danilo', '58f9fc7b6113f8fe08544f9402babe6cddf145914ef605ce340faf5942a5b617.3ebda399bde0174d758c8251fcff82f0', 'danilo@gmail.com', true);

SELECT * FROM admins;