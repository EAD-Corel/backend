exports.up = function (knex) {
  return knex.schema.createTable("modules", (table) => {
    table.increments("id").primary();
    table.integer("idCourse").unsigned().notNullable();
    table.foreign("idCourse").references("id").inTable("courses");
    table.string("name").notNullable();
    table.string("description");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("modules");
};
