"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    realname: DataTypes.STRING,
    password: DataTypes.STRING,
    likes: DataTypes.ARRAY(DataTypes.INTEGER), //post likes
    follows: DataTypes.ARRAY(DataTypes.STRING) //blog follows
  }, {
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Blog, { through: 'userblogs' });
        User.hasMany(models.Blog);
        User.hasMany(models.Post, { onDelete: 'CASCADE' });
        User.hasOne(models.DefBlog, { onDelete: 'CASCADE' });
        User.hasMany(models.Comment, { onDelete: 'CASCADE' });
        User.belongsToMany(models.Blog, {through: 'Blog_Authors'});
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
