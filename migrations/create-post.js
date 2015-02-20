"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration
      .createTable('Posts', {
        text: DataTypes.STRING
      })
      .complete(done)
  },

  down: function(migration, DataTypes, done) {
    migration
      .dropTable('Posts')
      .complete(done)
  }
};