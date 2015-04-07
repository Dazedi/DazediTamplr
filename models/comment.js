"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Post);
        Comment.belongsTo(models.User);

        //Comment.belongsTo(models.User);
        //User.hasMany(models.Post)
        
        // Tässä voi assosioida malleja toisiinsa
        // http://sequelize.readthedocs.org/en/latest/docs/associations/
        //
        // Tyyliin
        // User.hasMany(models.BlogPost);
      }
    }
  });

  return Comment;
};
