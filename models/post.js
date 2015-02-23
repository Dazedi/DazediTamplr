"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    author: DataTypes.STRING, // poster
    likes: { type: DataTypes.INTEGER, defaultValue: 0 } // amount of likes
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.Blog);
        Post.belongsTo(models.defBlog);
        Post.hasMany(models.Comment, { onDelete: 'CASCADE'});
        Post.belongsTo(models.User);
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
