"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.Blog);
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment);

        //Post.belongsToMany(models.Blog, {as: 'Likers', through: 'likedpost_likers'});

        Post.belongsToMany(models.User, { as: 'Likes', through: 'likes_likedposts' });

        /*Post.belongsTo(models.Blog);
        Post.belongsTo(models.DefBlog);
        Post.hasMany(models.Comment, { onDelete: 'CASCADE'});
        Post.belongsTo(models.User);*/
        //User.hasMany(models.Post)
        
        // Tässä voi assosioida malleja toisiinsa
        // http://sequelize.readthedocs.org/en/latest/docs/associations/
        //
        // Tyyliin
        // User.hasMany(models.BlogPost);
      }
    }
  });

  return Post;
};
