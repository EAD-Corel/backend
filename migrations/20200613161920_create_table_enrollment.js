exports.up = function (knex) {
  return knex.schema.createTable("enrollment", (table) => {
    table.increments("id").primary();
    table.integer("student").unsigned().notNullable();
    table.integer("course").unsigned().notNullable();
    table.foreign("student").references("id").inTable("users");
    table.foreign("course").references("id").inTable("courses");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("enrollment");
};
