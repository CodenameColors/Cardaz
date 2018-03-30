
exports.up = function(knex, Promise) {
  return knex.schema.table('heartdata', function(t){
  	t.binary('raw_heart_data').notNullable().default(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('heartdata', function(t) {
  	t.dropColumn('raw_heart_data');
  });
};