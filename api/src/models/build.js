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
    models.Build.belongsTo(models.Item, {
      as: 'RelatedToItem',
      foreignKey: { name: 'RelatedToItemId' },
    });
    models.Build.belongsTo(models.Item, {
      as: 'PerfectRune',
      foreignKey: { name: 'PerfectRuneId' },
    });
    models.Build.belongsTo(models.Item, {
      as: 'PerfectSpirityRune',
      foreignKey: { name: 'PerfectSpirityRuneId' },
    });
  };
  
  return Build;
};
