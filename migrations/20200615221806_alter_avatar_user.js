exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.text("avatar", 600000).alter();
  });
};

exports.down = function (knex) {
  table.string("avatar").alter();
};
