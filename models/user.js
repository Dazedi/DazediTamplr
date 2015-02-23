"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    realname: DataTypes.STRING,
    password: DataTypes.STRING,
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: '{}'
    }, //post likes
    follows: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: '{}'
    } //blog follows
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
