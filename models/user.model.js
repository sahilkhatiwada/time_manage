// user.model.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true,trim: true,},
    password: { type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "teacher"),
      defaultValue: "student",
      allowNull: false,
      validate: { notNull: true, notEmpty: true },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.TeacherAvailability);
    User.hasMany(models.MeetingRequest, { foreignKey: "teacherId" });
    User.hasMany(models.MeetingRequest, { foreignKey: "studentId" });
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
  };

  return User;
};
