const router = require('express').Router();
const categoryRoutes = require('./categories');
const productRoutes = require('./products');
const reviewRoutes = require('./reviews');
const redis = require('../../../config/redis');


// router.use((req, res, next) => {
//     if (req.method === 'GET') {
//       res.set('Cache-Control', 'private, max-age=300');
//     }
  
//     next();
//   });

router.use(async (req, res, next) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', 'private, max-age=300');
  
      const cache = await redis.get(req.originalUrl);
  
      if (cache) {
        res.status(200).json(JSON.parse(cache));
        return;
        // We want to preserve our browser cache header, 
        // so we check for the existence of a 
        // server-side cache and send that back as 
        // the response - by returning out of the
        // method, instead of continuing on to 
        // the router.get() callback, by next().
      }
    }
  
    next();
  });
  



router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;