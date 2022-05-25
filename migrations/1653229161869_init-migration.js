/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('todos', {
        id: 'id',
        email: { type: 'varchar(100)', notNull: true },
        username: { type: 'varchar(100)', notNull: true },
        content: { type: 'varchar(1000)', notNull: true },
        status: { type: 'boolean' }
    });
};

exports.down = pgm => {
    pgm.dropTable('todos');
};
