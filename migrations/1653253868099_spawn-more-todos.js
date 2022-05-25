/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('2@mail.ru', 'ololo', '2nd todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('3@mail.ru', 'ololo', '3d todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('4@mail.ru', 'ololo', '4th todo', 'true')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('5@mail.ru', 'ololo', '5th todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('6@mail.ru', 'ololo', '6th todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('7@mail.ru', 'ololo', '7th todo', 'true')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('8@mail.ru', 'ololo', '8th todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('9@mail.ru', 'ololo', '9th todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('10@mail.ru', 'ololo', '10th todo', 'false')`);
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('11@mail.ru', 'ololo', '11th todo', 'false')`);
};

exports.down = pgm => {};
