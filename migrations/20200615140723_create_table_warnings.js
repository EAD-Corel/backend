exports.up = function (knex) {
  return knex.schema.createTable("warnings", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("text").notNull();
    table.integer("course").unsigned().notNullable();
    table.foreign("course").references("id").inTable("courses");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("warnings");
};
