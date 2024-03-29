const router = require('express').Router();
const { Category } = require('../../../models');
const redis = require('../../../config/redis');



router.get('/', async (req, res) => {
    try {
      const { rows } = await Category.getAll();

      await redis.set(req.originalUrl, JSON.stringify(rows), 'EX', 3600);
  
      res.status(200).json(rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });



  router.post('/', async (req, res) => {
    try {
      const { rows } = await Category.create(req.body);
  
      res.status(200).json(rows[0]);
    }
    catch (err) {
      console.error(err);
      res.status(err.table ? 400 : 500).end();
    }
  });



  router.get('/:id', async (req, res) => {
    try {
      const { rows, rowCount } = await Category.getOne({
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
      const { rowCount } = await Category.update({ 
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
      const { rowCount } = await Category.delete({
        id: req.params.id
      });
  
      res.status(rowCount === 0 ? 404 : 204).end();
    }
    catch (err) {
      console.error(err);
      res.status(500).end();
    }
  });








module.exports = router;

