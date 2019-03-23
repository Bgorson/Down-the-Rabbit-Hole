module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: DataTypes.STRING,
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
