exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.string("telefone").notNull();
    table.string("registration_date").notNull();
    table.string("avatar");
    table.boolean("admin");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
