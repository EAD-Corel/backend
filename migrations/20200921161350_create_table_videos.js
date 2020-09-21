exports.up = function (knex) {
  return knex.schema.createTable("videos", (table) => {
    table.increments("id").primary();
    table.string("hash").notNull();
    table.boolean("error").notNull().defaultTo(false);
    table.boolean("process").notNull().defaultTo(true);
    table.string("sd");
    table.string("hd");
    table.string("fullHD");
  });
};

exports.down = function (knex) {};
