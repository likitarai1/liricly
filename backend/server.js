const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const playlist = require('./routes/playlist');
const db = require('./connection');

const saltRounds = 10;

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: 'userID',
    secret: '$%nmbdshbhsj*',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use('/playlist', playlist);

app.post('/register', (req, res) => {
  const username = req.body.username;
  const pass = req.body.pass;

  if (username === '') {
    res.send({ message: 'Username required' });
  } else if (pass === '') {
    res.send({ message: "Password field can't be empty" });
  } else {
    bcrypt.hash(pass, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          'INSERT INTO users (username, password) VALUES (?,?)',
          [username, hash],
          (err, result) => {
            if (err) {
              res.send({ message: 'Same username exists' });
            } else {
              console.log(result);
              res.send({ result });
            }
          }
        );
      }
    });
  }
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const pass = req.body.pass;

  db.query('SELECT * FROM users WHERE username = ?', username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(pass, result[0].password, (err, response) => {
        if (response) {
          req.session.user = result;
          res.send({ msg: 'successfully logged in', userdata: req.session.user[0] });
        } else {
          res.send({ msg: 'Incorrect password' });
        }
      });
    } else {
      res.send({ message: 'User does not exist' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
