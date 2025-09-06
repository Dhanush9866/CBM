const Blog = require('../models/Blog');

// Get all published blogs with pagination and filtering
const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      featured,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = { isPublished: true };

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (tag) {
      query.tags = { $in: [new RegExp(tag, 'i')] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const blogs = await Blog.find(query)
      .select('-content') // Exclude full content for list view
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// Get single blog by ID or slug
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is a valid ObjectId or slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    let blog;
    if (isObjectId) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog || !blog.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    await blog.incrementViewCount();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

// Get featured blogs
const getFeaturedBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitNum = parseInt(limit);

    const blogs = await Blog.getFeatured()
      .select('-content')
      .limit(limitNum)
      .lean();

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blogs',
      error: error.message
    });
  }
};

// Get blogs by tag
const getBlogsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find({
      isPublished: true,
      tags: { $in: [new RegExp(tag, 'i')] }
    })
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Blog.countDocuments({
      isPublished: true,
      tags: { $in: [new RegExp(tag, 'i')] }
    });

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        blogs,
        tag,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs by tag',
      error: error.message
    });
  }
};

// Search blogs
const searchBlogs = async (req, res) => {
  try {
    const { q: query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.search(query)
      .select('-content')
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Blog.countDocuments({
      isPublished: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    });

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        blogs,
        query,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching blogs',
      error: error.message
    });
  }
};

// Get all unique tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { isPublished: true });
    
    res.json({
      success: true,
      data: tags.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: error.message
    });
  }
};

// Create new blog (Admin only)
const createBlog = async (req, res) => {
  try {
    const blogData = req.body;

    // Generate slug if not provided
    if (!blogData.slug && blogData.title) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }

    const blog = new Blog(blogData);
    await blog.save();

    res.status(201).json({
      success: true,
      data: blog,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
};

// Update blog (Admin only)
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      data: blog,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
};

// Delete blog (Admin only)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getFeaturedBlogs,
  getBlogsByTag,
  searchBlogs,
  getAllTags,
  createBlog,
  updateBlog,
  deleteBlog
};