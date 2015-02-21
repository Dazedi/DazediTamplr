"use strict";

module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("Blog", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Blog.hasMany(models.Author);
        //User.hasMany(models.Post)
        
        // Tässä voi assosioida malleja toisiinsa
        // http://sequelize.readthedocs.org/en/latest/docs/associations/
        //
        // Tyyliin
        // User.hasMany(models.BlogPost);
      }
    }
  });

  return Blog;
};
