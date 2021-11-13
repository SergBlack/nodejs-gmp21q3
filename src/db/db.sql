create TABLE "user"(
  id SERIAL PRIMARY KEY,
  login varchar(64) NOT NULL,
  password varchar(64) NOT NULL,
  age SMALLINT,
  isDeleted BOOLEAN,
  createdAt TIMESTAMP
)
