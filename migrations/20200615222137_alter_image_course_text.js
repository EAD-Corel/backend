exports.up = function (knex) {
  return knex.schema.alterTable("courses", (table) => {
    table.text("image", 600000).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("courses", (table) => {
    table.string("image").alter();
  });
};
