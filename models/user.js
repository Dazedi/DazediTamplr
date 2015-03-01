"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      validate: { is: /^[a-z][a-z0-9_]*/i }
    },
    realname: DataTypes.STRING,
    password: DataTypes.STRING,
    //likes: DataTypes.ARRAY(DataTypes.STRING), //post likes
    //follows: DataTypes.ARRAY(DataTypes.STRING)//blog follows
  }, {
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Blog, { through: 'userblogs' });
        
        /*
        User.hasMany(models.Blog);
        User.hasMany(models.Post, { onDelete: 'CASCADE' });
        User.hasOne(models.DefBlog, { onDelete: 'CASCADE' });
        User.hasMany(models.Comment, { onDelete: 'CASCADE' });
        User.belongsToMany(models.Blog, {through: 'Blog_Authors'});
        */

        User.belongsToMany(models.Blog, {as: 'AuthoredBlogs', through: 'author_authoredblogs'});
        User.belongsToMany(models.Blog, {as: 'FollowedBlogs', through: 'follower_followedblogs'});

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
