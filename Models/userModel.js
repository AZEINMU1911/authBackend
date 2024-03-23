//creating table for database

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return User;
  };