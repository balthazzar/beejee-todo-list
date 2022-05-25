/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`INSERT INTO todos (email, username, content, status) VALUES ('1@mail.ru', 'ololo', '1st todo', 'false')`);
};

exports.down = pgm => {};
