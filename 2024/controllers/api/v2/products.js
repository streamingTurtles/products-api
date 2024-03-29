const router = require('express').Router();
const { Product, Review } = require('../../../models');
const redis = require('../../../config/redis');



router.get('/', async (req, res) => {

  const page = parseInt(req.query.page) || 1;

  const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`);
  let link = '';


  try {
    const { rows } = await Product.getAll({
      ...req.query,
      page
      //res.status(200).json(rows);
    });

    if (rows.length > 0 && page > 1) {
    url.searchParams.set('page', page - 1);
    link += `<${url.href}>; rel="prev"`;
    }

    if (rows.length > Product.offset) {
    if (link != '') {
      link +=', ';
    }

    rows.pop();

    url.searchParams.set('page', page + 1);
    link += `<${url.href}>; rel="next"`;
    }

  await redis.set(req.originalUrl, JSON.stringify(rows), 'EX', 300);  
  res.set('Link', link).status(200).json(rows);
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



// router.get('/:id/reviews', async (req, res) => {
//   try {
//     const { rows } = await Review.getAll({
//       product_id: req.params.id,
//       ...req.query
//     });

//     res.status(200).json(rows);
//   }
//   catch (err) {
//     console.error(err);
//     res.status(500).end();
//   }
// });

router.get('/:id/reviews', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`);
  let link = '';

  try {
    const { rows } = await Review.getAll({
      product_id: req.params.id,
      ...req.query,
      page
    });

    if (rows.length > 0 && page > 1) {
      url.searchParams.set('page', page - 1);
      link += `<${url.href}>; rel="prev"`;
    }

    if (rows.length > Review.offset) {
      if (link != '') {
        link +=', ';
      }

      rows.pop();
      url.searchParams.set('page', page + 1);
      link += `<${url.href}>; rel="next"`;
    }

    await redis.set(req.originalUrl, JSON.stringify(rows), 'EX', 300);
    res.set('Link', link).status(200).json(rows);
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
