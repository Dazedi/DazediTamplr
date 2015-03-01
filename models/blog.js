"use strict";

module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("Blog", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    followers: DataTypes.ARRAY(DataTypes.STRING) // followers of the blog
  }, {
    classMethods: {
      associate: function(models) {
        //Blog.hasMany(models.Post, { onDelete: 'CASCADE'  });
        //Blog.hasMany(models.User, { through: 'userblogs' });
        //Blog.belongsTo(models.User); // Blog is owned by User
        Blog.belongsToMany(models.User, {as: 'Authors', through: 'author_authoredblogs'}); // Users who are authors for this blog
        Blog.belongsToMany(models.User, {as: 'Followers', through: 'follower_followedblogs'});
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
