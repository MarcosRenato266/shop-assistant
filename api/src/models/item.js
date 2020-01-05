'use strict';

export default (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    internalId:{
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    tier: {
      type: DataTypes.STRING,
    },
    itemImage: {
      type: DataTypes.STRING,
    },
  });

  // Item.associate = models => {
  //   models.Item.hasOne(models.Build, {
  //     as: 'PerfectBuildFrom',
  //     foreignKey: { name: 'perfectBuildFromId' },
  //   });
  // };

  return Item;
};
