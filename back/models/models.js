const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  },
  { timestamps: false }
);

const Purchase = sequelize.define(
  "purchase",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    tags: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false }
);

const Tag = sequelize.define(
  "tag",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { timestamps: false }
);

const Need = sequelize.define(
  "need",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { timestamps: false }
);

const Freq = sequelize.define(
  "freq",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { timestamps: false }
);

Need.hasMany(Purchase);
Purchase.belongsTo(Need);

Freq.hasMany(Purchase);
Purchase.belongsTo(Freq);

module.exports = {
  User,
  Purchase,
  Tag,
  Need,
  Freq,
};
