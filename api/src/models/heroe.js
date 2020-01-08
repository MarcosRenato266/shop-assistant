'use strict';

export default (sequelize, DataTypes) => {
  const Heroe = sequelize.define('Heroe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    className: {
      type: DataTypes.STRING,
    },
    subClass: {
      type: DataTypes.STRING,
    },
    goldHireCost: {
      type: DataTypes.STRING,
    },
    gemsHireCost: {
      type: DataTypes.STRING,
    },
    prerequisite: {
      type: DataTypes.STRING,
    },
    criticalChancePercent: {
      type: DataTypes.INTEGER,
    },
    criticalDamageTimes: {
      type: DataTypes.INTEGER,
    },
    threatRating: {
      type: DataTypes.INTEGER,
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    atk: {
      type: DataTypes.INTEGER,
    },
    def: {
      type: DataTypes.INTEGER,
    },
    evaPercent: {
      type: DataTypes.INTEGER,
    },
    element: {
      type: DataTypes.STRING,
    },
    canUseCategories: {
      type: DataTypes.JSON,
    },
    equipmentSlots: {
      type: DataTypes.JSON,
    },
    skillUnlock: {
      type: DataTypes.JSON,
    },
  });

  return Heroe;
};
