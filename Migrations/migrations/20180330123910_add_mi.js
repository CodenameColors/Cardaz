
exports.up = function(knex, Promise) {
  return knex.schema.table('patient', function(t){
  	t.specificType('mi', 'CHAR(1)');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('patient', function(t) {
  	t.dropColumn('mi');
  });
};