exports.up = function(knex) {
    return  knex.schema.createTable('cpdlc', function(table){

      table.string('id').primary();
      table.string('cod').notNullable();
      table.string('message').notNullable();

    });
  };
  
  exports.down = function(knex) {

    return knex.schema.dropTable('cpdlc');
    
  };