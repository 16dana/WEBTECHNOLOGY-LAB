const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'appa',
  database: 'attendance'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  } else {
    console.log('Connected to the database.');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/high.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'high.html'));
});
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/low.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'low.html'));
});

app.get('/view.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'evnt.html'));
});

app.get('/singup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'singup.html'));
});

app.get('/record.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'record.html'));
});

app.get('/auth.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'second.html'));
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  connection.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error storing data in the database:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    console.log('Data stored successfully.');
    res.redirect('/evnt.html');
  });
});

app.get('/evnt.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'evnt.html'));
});

app.get('/second', (req, res) => {
  res.sendFile(path.join(__dirname, 'second.html'));
});

app.get('/second.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'second.html'));
});

app.get('/record.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'record.html'));
});

app.post('/record', (req, res) => {
  const { studentname, morningattendance, afternoonattendance, date } = req.body;

  const sql = 'INSERT INTO student (student_name, morning_attendance, afternoon_attendance, dates) VALUES (?, ?, ?, ?)';

  connection.query(sql, [studentname, morningattendance, afternoonattendance, date], (err, result) => {
    if (err) {
      console.error('Error storing data in the database:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }

    console.log('Data stored successfully.');
    res.redirect('/evnt.html');
  });
});

app.post('/logi', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT username, password FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err.stack);
      return res.status(500).send('An error occurred.');
    }

    if (results.length === 1) {
      res.redirect('/evnt.html');
    } else {
      res.send('Invalid username or password.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
