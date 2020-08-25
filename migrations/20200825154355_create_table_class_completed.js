exports.up = function (knex) {
  return knex.schema.createTable("classCompleted", (table) => {
    table.increments("id").primary();
    table.integer("course").unsigned().notNullable();
    table.foreign("course").references("id").inTable("courses");
    table.integer("user").unsigned().notNullable();
    table.foreign("user").references("id").inTable("users");
    table.integer("class").unsigned().notNullable();
    table.foreign("class").references("id").inTable("classes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("classCompleted");
};
