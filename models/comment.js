//comment model
//establishes relationship to posts and users

module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: DataTypes.TEXT,
    name: DataTypes.STRING
  });
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: true
        }
      }),
      Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: true
        }
      });
  };
  return Comment;
};