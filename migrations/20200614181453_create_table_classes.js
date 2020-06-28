exports.up = function (knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("video");
    table.text("description");
    table.integer("author").unsigned().notNullable();
    table.integer("module").unsigned().notNullable();
    table.integer("course").unsigned().notNullable();
    table.foreign("author").references("id").inTable("users");
    table.foreign("module").references("id").inTable("modules");
    table.foreign("course").references("id").inTable("courses");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("classes");
};
