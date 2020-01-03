'use strict';

export default (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    city: DataTypes.STRING,
    occupation: DataTypes.STRING,
  });

  return Admin;
};
