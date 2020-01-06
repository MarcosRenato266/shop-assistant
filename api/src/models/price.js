'use strict';

export default (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Type: 0 from admin - 1 from users
    author: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    moneyCheap: {
      type: DataTypes.STRING,
    },
    moneyIndicated: {
      type: DataTypes.STRING,
    },
    moneyExpensive: {
      type: DataTypes.STRING,
    },
    gemsCheap: {
      type: DataTypes.STRING,
    },
    gemsIndicated: {
      type: DataTypes.STRING,
    },
    gemsExpensive: {
      type: DataTypes.STRING,
    },
    worksCounter: {
      type: DataTypes.INTEGER,
    },
  });

  Price.associate = models => {
    models.Price.belongsTo(models.Build, {
      as: 'PriceFromBuild',
      foreignKey: { name: 'PriceFromBuildId' },
    });
  };

  return Price;
};
