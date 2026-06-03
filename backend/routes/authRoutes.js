const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { EmpID, UserName, Password } = req.body;

  if (!EmpID || !UserName || !Password) {
    return res.status(400).json({
      message: "Employee ID, username, and password are required",
    });
  }

  const checkSql = "SELECT * FROM Users WHERE EmpID = ? OR UserName = ?";

  db.query(checkSql, [EmpID, UserName], async (err, results) => {
    if (err) {
      console.log("CHECK USER ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: "Employee ID or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const insertSql = `
      INSERT INTO Users (EmpID, UserName, Password)
      VALUES (?, ?, ?)
    `;

    db.query(insertSql, [EmpID, UserName, hashedPassword], (insertErr) => {
      if (insertErr) {
        console.log("REGISTER ERROR:", insertErr);
        return res.status(500).json({
          message: "Registration failed",
        });
      }

      res.status(201).json({
        message: "Account created successfully",
      });
    });
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { UserName, Password } = req.body;

  if (!UserName || !Password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const sql = "SELECT * FROM Users WHERE UserName = ?";

  db.query(sql, [UserName], async (err, results) => {
    if (err) {
      console.log("LOGIN ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    req.session.user = {
  UserID: user.UserID,
  EmpID: user.EmpID,
  UserName: user.UserName,
};

res.json({
  message: "Login successful",
  user: req.session.user,
   });
  });
});

/* CHECK LOGIN */
router.get("/check", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

/* LOGOUT */
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout successful" });
  });
});

module.exports = router;