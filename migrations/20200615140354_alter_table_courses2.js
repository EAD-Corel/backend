exports.up = function (knex) {
  return knex.schema.alterTable("courses", (table) => {
    table.string("image", 166000).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("courses", (table) => {
    table.string("image", 6000).alter();
  });
};
