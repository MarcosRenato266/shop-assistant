'use strict';

export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
    },
    subCategory: {
      type: DataTypes.STRING,
    },
    categoryImage: {
      type: DataTypes.STRING,
    },
  });

  return Category;
};
