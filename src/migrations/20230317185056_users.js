/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
    table.increments('id').primary().notNullable();
    table.string('nickname', 255).notNullable().unique();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
  })
    .createTable('posts', (table) => {
      table.increments('id').primary().notNullable();
      table.string('title', 255).notNullable();
      table.string('message', 255).notNullable();
      table.integer('user_id', 11).unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('comments', (table) => {
      table.increments('id').primary().notNullable();
      table.string('message', 255).notNullable();
      table.integer('post_id', 11).unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('user_id', 11).unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('comments')
    .dropTable('posts')
    .dropTable('users');
};
