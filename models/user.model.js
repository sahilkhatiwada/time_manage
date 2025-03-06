// user.model.js
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      role: { type: DataTypes.ENUM('student', 'teacher', 'admin') }
    });
  
    User.associate = models => {
      User.hasMany(models.TeacherAvailability);
      User.hasMany(models.MeetingRequest, { foreignKey: 'teacherId' });
      User.hasMany(models.MeetingRequest, { foreignKey: 'studentId' });
      User.hasMany(models.Post);
      User.hasMany(models.Comment);
    };
    
    return User;
  };