const postService = require('../services/blogPost.service');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

try {
  const post = await postService.createPost(title, content, categoryIds);
  res.status(201).json(post);
} catch (error) {
  res.status(400).json({ message: error.message });
}
};

const allPosts = async (_req, res) => {
    const posts = await postService.allPost();
    res.status(200).json(posts);
};

const postById = async (req, res) => {
    const { id } = req.params;
    const post = await postService.postById(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(post);
};

module.exports = {
    createPost,
    allPosts,
    postById,  
};