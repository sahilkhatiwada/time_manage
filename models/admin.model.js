export default (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      trim: true,
      validate: { isEmail: true, notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  /**
   * Define associations for the Admin model.
   * @param {Object} models - The sequelize models object.
   */
  Admin.associate = (models) => {
    Admin.hasMany(models.Post, { foreignKey: "adminId" }); // If admins can post announcements
    Admin.hasMany(models.MeetingRequest, { foreignKey: "adminId" }); // If admins can oversee meetings
  };

  return Admin;
};
