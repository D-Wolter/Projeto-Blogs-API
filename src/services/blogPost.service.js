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

const createPost = async (title, content, categoryIds) => {
    const requiredInput = [title, content, categoryIds];

    if (requiredInput.some((field) => !field) || !categoryIds.length) {
    throw new Error('Some required fields are missing');
    }
    
    const categories = await Category.findAll({ where: { id: categoryIds } });

    if (categories.length !== categoryIds.length) {
    throw new Error('one or more "categoryIds" not found');
    }
    
    const newBlogPost = await BlogPost.create({ title, content });
    await newBlogPost.addCategories(categories);
    
    return newBlogPost;
    };

    module.exports = { 
        allPost,
        postById,
        createPost,
    };