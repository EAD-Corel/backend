exports.up = function (knex) {
  return knex.schema.createTable("courses", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("description");
    table.string("image");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("courses");
};
