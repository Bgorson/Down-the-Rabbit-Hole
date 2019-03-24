module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.TEXT
  });
  
// ENUMS- allows for only some acceptable options, not whatever

  Post.associate = function(models) {
    // Post.belongsTo(models.User, {
    //   foreignKey: {
    //     allowNull: true
    //   }
    // }),
    Post.hasMany(models.Comment, {
      onDelete: "cascade"
    })
  };
  return Post;
  
};
