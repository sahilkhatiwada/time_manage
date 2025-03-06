// availability.model.js
export default (sequelize, DataTypes) => {
    const TeacherAvailability = sequelize.define('TeacherAvailability', {
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      status: { 
        type: DataTypes.ENUM('available', 'busy'),
        defaultValue: 'available'
      }
    });
  
    TeacherAvailability.associate = models => {
      TeacherAvailability.belongsTo(models.User);
    };
    
    return TeacherAvailability;
  };