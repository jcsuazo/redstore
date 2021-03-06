import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  let sort;
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'priceUp':
        sort = { price: 1 };
        break;
      case 'priceDown':
        sort = { price: -1 };
        break;
      case 'latest':
        sort = { createdAt: 1 };
        break;
      case 'oldest':
        sort = { createdAt: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      default:
        sort = { price: -1 };
        break;
    }
  }
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ ...sort });
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json('Product remove');
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Upate a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  if (rating > 5 || rating < 0) {
    res.status(400);
    throw new Error('The rating must be between 0 and 5');
  }
  if (rating === undefined || rating === '' || !comment) {
    res.status(400);
    throw new Error('Please provide a rating and a comment');
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );
    if (alreadyReview) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// @desc    Get latest 4 feature products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true })
    .sort({ rating: -1 })
    .limit(4);

  res.json(products);
});

// @desc    Get latest products
// @route   GET /api/products/latest
// @access  Public
const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: false, homeFeatured: false })
    .sort({ rating: -1 })
    .limit(8);

  res.json(products);
});

// @desc    Get top 4 related products
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const products = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .sort({ createdAt: -1 })

    .limit(4);
  res.json(products);
});

// @desc    Get the Home Featured Product
// @route   GET /api/products/home/featured
// @access  Public
const getHomeFeaturedProducts = asyncHandler(async (req, res) => {
  let product = await Product.findOne({ homeFeatured: true });
  if (!product) {
    product = await Product.findOne({});
  }
  res.json(product);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
  getLatestProducts,
  getRelatedProducts,
  getHomeFeaturedProducts,
};
