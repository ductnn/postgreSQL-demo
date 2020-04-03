const bcrypt = require('bcrypt');
const pool = require('../../models/user.model');

// GET

//-- GET all users
module.exports.getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}


//--GET Single users
module.exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
};



// POST
module.exports.createUser = (req, res) => {
  const { name, email, phone, password } = req.body;

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    // Store hash in your password DB.
    pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)', 
      [name, email, phone, hash], 
      (error, results) => {
        if (error) {
          throw error;
        };
        res.status(201).send(`User added with ID: ${result.insertId}`);    
    });    
  });  
};

// PUT
module.exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, password } = req.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2, phone = $3, password = $4 WHERE id = $5',
    [name, email, phone, password, id],
    (error, results) => {
      if (error) {
        throw error;
      };
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE
module.exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id); 
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    };
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};
