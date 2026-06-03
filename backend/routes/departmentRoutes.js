const express = require("express");
const db = require("../db");

const router = express.Router();

/* CREATE department */
router.post("/", (req, res) => {
  const { DepartName } = req.body;

  if (!DepartName) {
    return res.status(400).json({ message: "Department name is required" });
  }

  const sql = "INSERT INTO Department (DepartName) VALUES (?)";

  db.query(sql, [DepartName], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Department already exists or server error" });
    }

    res.status(201).json({
      message: "Department created successfully",
      departmentId: result.insertId,
    });
  });
});

/* READ all departments */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Department ORDER BY DepartID DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch departments" });
    }

    res.json(results);
  });
});

/* UPDATE department */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { DepartName } = req.body;

  if (!DepartName) {
    return res.status(400).json({ message: "Department name is required" });
  }

  const sql = "UPDATE Department SET DepartName = ? WHERE DepartID = ?";

  db.query(sql, [DepartName, id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update department" });
    }

    res.json({ message: "Department updated successfully" });
  });
});

/* DELETE department */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Department WHERE DepartID = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Cannot delete department because it may have employees",
      });
    }

    res.json({ message: "Department deleted successfully" });
  });
});

module.exports = router;