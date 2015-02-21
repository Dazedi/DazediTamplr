"use strict";

module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Author.belongsTo(models.Blog);
        //User.hasMany(models.Post)
        
        // Tässä voi assosioida malleja toisiinsa
        // http://sequelize.readthedocs.org/en/latest/docs/associations/
        //
        // Tyyliin
        // User.hasMany(models.BlogPost);
      }
    }
  });

  return Author;
};
