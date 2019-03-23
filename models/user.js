module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Comment, {
      onDelete: "cascade"
    }),
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };
  return User;
};
