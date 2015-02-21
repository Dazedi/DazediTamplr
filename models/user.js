"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    realname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Blog, { as: 'Blogs' });
        
        // Tässä voi assosioida malleja toisiinsa
        // http://sequelize.readthedocs.org/en/latest/docs/associations/
        //
        // Tyyliin
        // User.hasMany(models.BlogPost);
      }
    }
  });

  return User;
};
