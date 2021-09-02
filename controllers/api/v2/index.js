const router = require('express').Router();
const categoryRoutes = require('./categories');
const productRoutes = require('./products');
const reviewRoutes = require('./reviews');

// router.use((req, res, next) => {
// 
    // res.set('Cache-Control', 'private, max-age=300');
//   
    // next();
//   });
//
// update so we don't limit users POSTs
router.use((req, res, next) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', 'private, max-age=300');
    }
  
    next();
  });


router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;






