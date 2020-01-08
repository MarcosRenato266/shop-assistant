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
    tier: {
      type: DataTypes.STRING,
    },
    itemImage: {
      type: DataTypes.STRING,
    },
  });

  Item.associate = models => {
    models.Item.belongsTo(models.Category, {
      as: 'RelatedCategory',
      foreignKey: { name: 'RelatedCategoryId' },
    });
  };

  return Item;
};
