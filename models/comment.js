module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: DataTypes.STRING,
    topic: DataTypes.INTEGER,
  });
  return Comment;
};
