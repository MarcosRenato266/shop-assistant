'use strict';

export default (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    internalId:{
      type: DataTypes.STRING,
      unique: true,
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

  // User.prototype.generateHash = function(password, weakSalt = false) {
  //   return new Promise((resolve, reject) => {
  //     const saltRounds = process.env.NODE_ENV === 'test' || weakSalt ? 1 : 12;
  //     bcrypt.genSalt(saltRounds, function(err, salt) {
  //       if (err) return reject(err);
  //       bcrypt.hash(password, salt, null, function(err, hash) {
  //         if (err) return reject(err);
  //         resolve(hash);
  //       });
  //     });
  //   });
  // };

  return Item;
};
