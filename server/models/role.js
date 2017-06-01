export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Role already exists'
      },
      validate: {
        notEmpty: {
          msg: 'title cannot be empty'
        },
        is: {
          args: /^$|[0-9a-zA-Z ]+$/,
          msg: 'Only letter and numbers are allowed'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users',
        });
      }
    }
  });
  return Role;
};
