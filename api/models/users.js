'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {}

    Users.init({
        userName: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              len: [3, 100],
              notEmpty: true,
            }
          },
        userEmail: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              len: [3, 100],
              notEmpty: true,
            
            }
          },
          userPasswordHash: { type: DataTypes.STRING },
          userPassword: { 
            type: DataTypes.VIRTUAL,
            validate: {
              isLongEnough: (val) => {
                if (val.length < 8) {
                  throw new Error("Please choose a longer password");
                }
              },
            },
          },
          imageURL:{
            type:DataTypes.STRING,
          },
          imageID:{
            type:DataTypes.STRING,
           },
        }, {
          sequelize,
          modelName: 'Users'
        });

      Users.associate = (models) => {
        // associations can be defined here
       
      };
      Users.beforeSave((user, options) => {
        if(user.userPassword) {
          user.userPasswordHash = bcrypt.hashSync(user.userPassword, 10);
        }
      });
    
     return Users;
    };