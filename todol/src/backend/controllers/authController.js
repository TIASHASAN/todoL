const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config');

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).send('Server error');
      res.send('User registered');
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, users) => {
    if (err || users.length == 0) return res.status(400).send('User not found');

    const user = users[0];
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  });
};
