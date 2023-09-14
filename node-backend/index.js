const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { readdirSync } = require('fs')
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

let shifts = [];
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "support_schedule",
  port: 8889,
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// app.post('/addRecord', (req, res) => {
//   const {name, type, hospitals, startTime, endTime, startDate, endDate } = req.body;
//   const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
//   const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

//   let sql = "INSERT INTO ShiftsAndOnSite (person_name, type, start_date, end_date, start_time, end_time, hospital) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
//   db.query(sql, [name,type, formattedStartDate, formattedEndDate, startTime, endTime, hospitals], (err, result) => {
//     if (err) {
//       console.log("MySQL error", err);
//       res.status(500).send({ success: false });
//     } else {
//       res.status(200).send({ success: true });
//     }
//   });
// });

// app.get('/getRecord', (req, res) => {
//   const sql = "SELECT * FROM ShiftsAndOnSite";
  
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log("MySQL error", err);
//       res.status(500).send({ success: false });
//     } else {
//       res.status(200).json(result);
//     }
//   });
// });

// Routes for registration and login
// User registration route
// app.post("/register", async (req, res) => {
//   const { username, password, email, prefix, nickname, name, lastname } =
//     req.body;

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Insert user into the database
//   db.query(
//     "INSERT INTO users (username, password,email,prefix,nickname,name,lastname) VALUES (?, ?,?, ?,?, ?,?)",
//     [username, hashedPassword, email, prefix, nickname, name, lastname],
//     (error, results) => {
//       if (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ message: "Registration failed" });
//         return;
//       }

//       res.status(200).json({ message: "Registration successful" });
//     }
//   );
// });

// // User login
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   // Retrieve user from the database
//   db.query(
//     "SELECT * FROM users WHERE username = ?",
//     [username],
//     async (error, results) => {
//       if (error || results.length === 0) {
//         res.status(401).json({ message: "Authentication failed" });
//         return;
//       }

//       const user = results[0];

//       // Compare the provided password with the stored hashed password
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (!passwordMatch) {
//         res.status(401).json({ message: "Authentication failed" });
//         return;
//       }

//       // Generate a JWT token
//       const token = jwt.sign({ userId: user.id }, "your-secret-key", {
//         expiresIn: "1h",
//       });

//       res.json({ msg: "Login Succees and your token ", token });
//     }
//   );
// });


/*readdirSync('./routes')
.map((r)=> app.use('/api', require('./routes/'+r)))*/



// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log("Server is running on port " + port);
// });



app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/worksite', (req, res) => {
  const sql = "SELECT * FROM work_site";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.get('/assignment', (req, res) => {
  const sql = "SELECT * FROM assignment";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



app.get('/support_schedule', (req, res) => {
  const sql = "SELECT * FROM support_schedule";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/support_schedule', (req, res) => {
  const shiftData = req.body;

  if (!shiftData.username) {
    res.status(400).send({ error: 'Username cannot be null' });
    return;
  }

  app.get('/joined_data', (req, res) => {
    const sql = `
      SELECT users.*, support_schedule.* 
      FROM users 
      JOIN support_schedule ON users.id = support_schedule.user_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
  });

  

  const query = 'INSERT INTO support_schedule SET ?';
  db.query(query, shiftData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Error inserting data', message: err.message });
    } else {
      res.send({ success: true, message: 'Data inserted successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


