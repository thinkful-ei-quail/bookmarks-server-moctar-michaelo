-- First, remove the table if it exists
DROP TABLE IF EXISTS bookmarks;

-- Create the table anew
CREATE TABLE bookmarks (
  id INTEGER PRIMARY KEY generated by DEFAULT AS identity,
  title TEXT UNIQUE NOT NULL,
  url VARCHAR UNIQUE NOT NULL,
  description VARCHAR(30),
  rating INTEGER NOT NULL
);