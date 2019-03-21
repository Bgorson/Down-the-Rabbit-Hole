module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    smallContent:DataTypes.TEXT,
    content: DataTypes.TEXT,
    category:DataTypes.TEXT
  });
  Post.associate = function(models){
    Post.belongsTo(models.User,{
      foreignKey: {
        allowNull:false
      }
    })
  }
  
  return Post;
};
