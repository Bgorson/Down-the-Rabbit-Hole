//post modal
//establishes relationship to users and comments
module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.TEXT,
    counter: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      Post.hasMany(models.Comment, {
        onDelete: "cascade"
      })
  };
  return Post;

};