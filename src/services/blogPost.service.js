const { Sequelize } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const allPost = async () => {
    const posts = await BlogPost.findAll({
        include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return posts;
};

const postById = async (id) => {
    const post = await BlogPost.findByPk(id, {
        include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    if (!post) return null;
    
    return post;
};

const createPost = async (userId, title, content, categoryIds) => {
    const requiredInput = [title, content, categoryIds];

    if (requiredInput.some((field) => !field) || !categoryIds.length) {
    throw new Error('Some required fields are missing');
    }
    
    const categories = await Category.findAll({ where: { id: categoryIds } });

    if (categories.length !== categoryIds.length) {
    throw new Error('one or more "categoryIds" not found');
    }
    
    const newBlogPost = await BlogPost.create({ title, content, userId });
    await newBlogPost.addCategories(categories);
    
    return newBlogPost;
    };

const updatePost = async (id, { title, content }) => {
    const post = await postById(id);
      
    post.title = title;
    post.content = content;
    post.updated = new Date();
    const updatedPost = await post.save();
        
    return updatedPost;
    };

    const removePost = async (id) => {
    const deletePost = await BlogPost.destroy(
        { where: { id } },
    );
    return deletePost;
};

const postSearchTerm = async (term) => {
  const posts = await BlogPost.findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${term}%` } },
        { content: { [Sequelize.Op.like]: `%${term}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = { 
  allPost,
  postById,
  createPost,
  updatePost,
  removePost,
  postSearchTerm,
};