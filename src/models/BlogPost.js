/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
      'BlogPost',
      {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
        },
        published: {
          type: DataTypes.DATE
        },
        updated: {
          type: DataTypes.DATE
        }
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'blog_posts'
      }
    );
  
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
  
    return BlogPost;
  }