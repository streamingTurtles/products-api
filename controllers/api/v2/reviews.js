const router = require('express').Router();
const { Review } = require('../../../models');


// routes were previously redided in v2/products.js - now moved to here and 
// Remember for each route to rename the path to /:id  and replace an instances of req.params.review_id with 
// req.params.id
//
router.get('/:product_id/reviews/:review_id', async (req, res) => {
    try {
      const { rows, rowCount } = await Review.getOne({
        // id: req.params.review_id
        id: req.params.id
      });
  
      if (rowCount > 0) {
        res.status(200).json(rows[0]);
      }
      else {
        res.status(404).end();
      }
    }
    catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });
  
  router.put('/:product_id/reviews/:review_id', async (req, res) => {
    try {
      const { rowCount } = await Review.update({ 
        // id: req.params.review_id,
        id: req.params.id,
        ...req.body 
      });
  
      res.status(rowCount === 0 ? 404 : 204).end();
    }
    catch (err) {
      console.error(err);
      res.status(err.table ? 400 : 500).end();
    }
  });
  
  router.delete('/:product_id/reviews/:review_id', async (req, res) => {
    try {
      const { rowCount } = await Review.delete({
        //id: req.params.review_id
        id: req.params.id,
      });
  
      res.status(rowCount === 0 ? 404 : 204).end();
    }
    catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });


  // Add a route to PATCH helpful_votes
  router.patch('/:id', async (req, res) => {
    try {
      const { rowCount } = await Review.updateVotes({ 
        id: req.params.id,
        helpful_votes: req.body.helpful_votes
      });
  
      res.status(rowCount === 0 ? 404 : 204).end();
    }
    catch (err) {
      console.error(err);
      res.status(err.table ? 400 : 500).end();
    }
  });
  

module.exports = router;