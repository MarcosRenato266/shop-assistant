'use strict';

export default (sequelize, DataTypes) => {
  const Build = sequelize.define('Build', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rarity: {
      type: DataTypes.STRING,
    },
  });

  Build.associate = models => {
    models.Build.hasOne(models.Item, {
      as: 'RelatedItem',
      foreignKey: { name: 'relatedItemId' },
    });
    models.Build.hasOne(models.Item, {
      as: 'PerfectRune',
      foreignKey: { name: 'perfectRuneId' },
    });
    models.Build.hasOne(models.Item, {
      as: 'PerfectSpirity',
      foreignKey: { name: 'perfectSpirityId' },
    });
  };

  return Build;
};
