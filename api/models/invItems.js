'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Inventory extends Model {}

    Inventory.init({
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [3, 100],
          notEmpty: true,
        }
      },
      category: {
        type: DataTypes.STRING,

      },
      quantity:{
        type: DataTypes.INTEGER,
        validate: {
           min:1, 
           notEmpty:true,
        }
      },
      dateAdded:{
          type: DataTypes.DATE,
          validate:{
              notEmpty:true,
          }
      },
      purchasePrice:{
          type: DataTypes.DECIMAL(10, 2),
          validate:{
              notEmpty:true,
              min:0.00,
          }
      },
      currentPrice:{
        type: DataTypes.DECIMAL(10, 2),
        validate:{
            notEmpty:true,
            min:0.00,
        }
       },
       description:{
          type: DataTypes.TEXT('medium'),
          validate:{
              notEmpty:true,
          }  
       },
       imageURL:{
         type:DataTypes.STRING,
       },
       imageID:{
        type:DataTypes.STRING,
       },
       public:{
        type: DataTypes.BOOLEAN,
        validate:{
          notEmpty:true,
        }

       },
    }, {
      sequelize,
      modelName: 'Inventory'
    });
  
    Inventory.associate = (models) => {
      // set up account relation later
      models.Inventory.belongsTo(models.Users,{as: 'Owner'});
    };
  
    return Inventory;
};

