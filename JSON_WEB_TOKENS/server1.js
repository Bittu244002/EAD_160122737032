const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const posts = [
  {
    name: "Mokshith",
    title: "Sustttt!",
    password: "AHVA@2005"
  },
  {
    name: "Vrits",
    title: "Crazyy Kadaaa!",
    password: "NONE@2004"
  }
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = posts.find(post => post.name === username);
  
  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN);
  res.json({ accessToken });
});

app.use(authenticateToken);

app.get('/posts', (req, res) => {
  console.log(req.user.name);
  res.json(posts.filter(post => post.name === req.user.name));
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
