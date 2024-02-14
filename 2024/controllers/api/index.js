// const router = require('express').Router();
// const productRoutes = require('./products');

// router.use('/products', productRoutes);

// module.exports = router;


const router = require('express').Router();

router.use((req, res, next) => {

    // this will cache all requests for 10,000 seconds, get and unecessarly post requests
    // we use if statment below to only cache get requests
    //res.set('Cache-Control', 'private, max-age=10000');

    if (req.method === 'GET') {
        res.set('Cache-Control', 'private, max-age=300');
      } 
  
    next();
  });





const v1Routes = require('./v1');
const v2Routes = require('./v2');

router.use('/v1', v1Routes);
router.use('/v2', v2Routes);

router.use('/', v1Routes);

module.exports = router;

