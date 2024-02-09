const router = require('express').Router();
const categoryRoutes = require('./categories');
const productRoutes = require('./products');
const reviewRoutes = require('./reviews');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;