'use strict';

export default (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    internalId:{
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
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

  return Item;
};
