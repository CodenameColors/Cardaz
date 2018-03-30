
exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTableIfNotExists('patient', (table) => {
		  table.increments().primary() //primary key ID
		  table.integer('address_id').unsigned().index().references('id').inTable('address')
		  table.integer('heart_id').unsigned().index().references('id').inTable('heartdata')
		  table.string('first_name').notNullable()
		  table.string('last_name').notNullable()
		  table.string('phone_number').notNullable()
	  }),
	  
	  knex.schema.createTableIfNotExists('address', (table) => {
		  table.increments().primary() //primary key ID
		  table.integer('patient_id').unsigned().index().references('id').inTable('patient')
		  table.string('street').notNullable()
		  table.string('city').notNullable()
		  table.string('state').notNullable()
		  table.integer('zip code').notNullable()
	  }),
	  
	  knex.schema.createTableIfNotExists('heartdata', (table) => {
		  table.increments().primary() //primary key
		  table.integer('patient_id').unsigned().references('id').inTable('patient')
		  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
		  table.integer('bpm').notNullable()
	  })
	  
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  
	  knex.schema.dropTableIfExists('heartdata'),
	  knex.schema.dropTableIfExists('address'),
	  knex.schema.dropTableIfExists('patient'),
  ])
};