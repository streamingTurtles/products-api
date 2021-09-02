const router = require('express').Router();
// added another ../ to make sure the path to models is found since it was moved from api/products.js into newly created folder v2
// also needed to update the models path for v1
const { Product, Review } = require('../../../models');

router.get('/', async (req, res) => {
  try {
    const { rows } = await Product.getAll(req.query);

    res.status(200).json(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const { rows } = await Product.create(req.body);

    res.status(200).json(rows[0]);
  }
  catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows, rowCount } = await Product.getOne({
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

router.put('/:id', async (req, res) => {
  try {
    const { rowCount } = await Product.update({ 
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

router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await Product.delete({
      id: req.params.id
    });

    res.status(rowCount === 0 ? 404 : 204).end();
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.get('/:id/reviews', async (req, res) => {
  try {
    const { rows } = await Review.getAll({
      product_id: req.params.id,
      ...req.query
    });

    res.status(200).json(rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

router.post('/:id/reviews', async (req, res) => {
  try {
    const { rows } = await Review.create({
      product_id: req.params.id,
      ...req.body
    });

    res.status(200).json(rows[0]);
  }
  catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

// REMOVED AND REPLACED INTO v2/reviews.js since these endpoints no longer reside in the products.js
// Remember for each route to rename the path to /:id  and replace an instances of req.params.review_id with 
// req.params.id
//
// router.get('/:product_id/reviews/:review_id', async (req, res) => {
  // try {
    // const { rows, rowCount } = await Review.getOne({
      // id: req.params.review_id
    // });
// 
    // if (rowCount > 0) {
      // res.status(200).json(rows[0]);
    // }
    // else {
      // res.status(404).end();
    // }
  // }
  // catch (err) {
    // console.error(err);
    // res.status(500).end();
  // }
// });
// 
// router.put('/:product_id/reviews/:review_id', async (req, res) => {
  // try {
    // const { rowCount } = await Review.update({ 
      // id: req.params.review_id,
      // ...req.body 
    // });
// 
    // res.status(rowCount === 0 ? 404 : 204).end();
  // }
  // catch (err) {
    // console.error(err);
    // res.status(err.table ? 400 : 500).end();
  // }
// });
// 
// router.delete('/:product_id/reviews/:review_id', async (req, res) => {
  // try {
    // const { rowCount } = await Review.delete({
      // id: req.params.review_id
    // });
// 
    // res.status(rowCount === 0 ? 404 : 204).end();
  // }
  // catch (err) {
    // console.error(err);
    // res.status(500).end();
  // }
// });


router.patch('/:id', async (req, res) => {
  try {
    const { rowCount } = await Product.updateQuantity({ 
      id: req.params.id,
      quantity: req.body.quantity
    });

    res.status(rowCount === 0 ? 404 : 204).end();
  }
  catch (err) {
    console.error(err);
    res.status(err.table ? 400 : 500).end();
  }
});

module.exports = router;
