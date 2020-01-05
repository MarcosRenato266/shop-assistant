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
    cheap: {
      type: DataTypes.STRING,
    },
    indicated: {
      type: DataTypes.STRING,
    },
    expensive: {
      type: DataTypes.STRING,
    },
    worksCounter: {
      type: DataTypes.INTEGER,
    },
  });

  Price.associate = models => {
    models.Price.belongsTo(models.Item, {
      as: 'PriceFromItem',
      foreignKey: { name: 'PriceFromItemId' },
    });
  };

  return Price;
};
