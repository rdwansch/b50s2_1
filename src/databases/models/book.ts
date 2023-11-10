import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { sequelize } from '../../config/connection';

export default class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare author: string;
  declare code: string;
  declare releasedAt: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releasedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'Books', sequelize }
);
