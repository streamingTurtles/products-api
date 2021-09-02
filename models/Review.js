const db = require('../config/connection');

class Review {

  constructor(){
    this.offset = 10;
  }



  // getAll({ product_id, sort }) {
    // let orderBy = 'ORDER BY ';
// 
    // switch(sort) {
      // case 'date':
        // orderBy += 'review_date DESC';
        // break;
      // case 'votes':
        // orderBy += 'helpful_votes DESC';
        // break;
      // case 'rating':
        // orderBy += 'rating DESC';
        // break;
      // default:
        // orderBy += 'id';
        // break;
    // }
// 
    // const query = `SELECT * FROM reviews WHERE product_id = $1 ${orderBy}`;
// 
    // return db.query(query, [ product_id ]);
  // }
  getAll({ product_id, sort, page }) {
    let orderBy = 'ORDER BY ';
    let offset = page
      ? `OFFSET ${this.offset * page - this.offset} LIMIT ${this.offset + 1}` 
      : '';
  
    switch(sort) {
      case 'date':
        orderBy += 'review_date DESC';
        break;
      case 'votes':
        orderBy += 'helpful_votes DESC';
        break;
      case 'rating':
        orderBy += 'rating DESC';
        break;
      default:
        orderBy += 'id';
        break;
    }
  
    const query = `SELECT * FROM reviews WHERE product_id = $1 ${orderBy} ${offset}`;
  
    return db.query(query, [ product_id ]);
  }
























  getOne({ id }) {
    return db.query('SELECT * FROM reviews WHERE id = $1', [ id ]);
  }

  create({ product_id, title, review_text, rating }) {
    return db.query(
      `INSERT INTO reviews (product_id, title, review_text, rating) 
      VALUES ($1, $2, $3, $4) RETURNING *`, 
      [ product_id, title, review_text, rating ]
    );
  }

  update({ id, title, review_text, rating }) {
    return db.query(
      `UPDATE reviews SET title = $1, review_text = $2, rating = $3
      WHERE id = $4`, 
      [ title, review_text, rating, id ]
    );
  }



  updateVotes({ id, helpful_votes }) {
    return db.query(
      `UPDATE reviews SET helpful_votes = $1 WHERE id = $2`, 
      [ helpful_votes, id ]
    );
  }



  delete({ id }) {
    return db.query('DELETE FROM reviews WHERE id = $1', [ id ]);
  }
}

module.exports = new Review();
