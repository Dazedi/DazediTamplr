"use strict";

// Default blog (created when user is created).
// I suppose I could've used blog as: 'defaultblog'==?

module.exports = function(sequelize, DataTypes) {
  var DefBlog = sequelize.define("DefBlog", {
    id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    followers: DataTypes.ARRAY(DataTypes.STRING) // followers of the blog
  }, {
    classMethods: {
      associate: function(models) {
        DefBlog.hasMany(models.Post, { onDelete: 'CASCADE'});
        DefBlog.belongsTo(modelsUser);
        //User.hasMany(models.Post)
        
        // Tässä voi assosioida malleja toisiinsa
        // http://sequelize.readthedocs.org/en/latest/docs/associations/
        //
        // Tyyliin
        // User.hasMany(models.BlogPost);
      }
    }
  });

  return DefBlog;
};