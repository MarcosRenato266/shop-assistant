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
  
  return Build;
};
