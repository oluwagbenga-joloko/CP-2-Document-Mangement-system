import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'firstName cannot be empty'
        },
        is: {
          args: /^[a-zA-Z]+$/,
          msg: 'Only letters are allowed'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'lastName cannot be empty'
        },
        is: {
          args: /^[a-zA-Z]+$/,
          msg: 'Only letters are allowed'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty'
        },
        isEmail: {
          args: true,
          msg: 'invalid email'
        }
      } },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty'
        },
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,

    },
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'Documents',
        });
      },
    },
    instanceMethods: {
      hashPassword() {
        return new Promise((resolve) => {
          bcrypt.hash(this.password, 2, (err, hash) => {
            resolve(hash);
          });
        });
      },
      verifyPassword(password) {
        return new Promise((resolve) => {
          bcrypt.compare(password, this.password).then((res) => {
            resolve(res);
          });
        });
      }
    },
    hooks: {
      beforeCreate(user) {
        return user.hashPassword().then((test) => {
          user.password = test;
        });
      },
      beforeUpdate(user) {
        return user.hashPassword().then((test) => {
          user.password = test;
        });
      }
    }
  });
  return User;
};
