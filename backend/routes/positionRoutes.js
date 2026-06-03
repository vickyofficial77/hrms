const express = require("express");
const db = require("../db");

const router = express.Router();

/* CREATE position */
router.post("/", (req, res) => {
  const { PosName, RequiredQualification } = req.body;

  if (!PosName || !RequiredQualification) {
    return res.status(400).json({
      message: "Position name and required qualification are required",
    });
  }

  const sql = `
    INSERT INTO Positions (PosName, RequiredQualification)
    VALUES (?, ?)
  `;

  db.query(sql, [PosName, RequiredQualification], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Position already exists or server error",
      });
    }

    res.status(201).json({
      message: "Position created successfully",
      positionId: result.insertId,
    });
  });
});

/* READ all positions */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Positions ORDER BY PosID DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch positions",
      });
    }

    res.json(results);
  });
});

/* UPDATE position */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { PosName, RequiredQualification } = req.body;

  const sql = `
    UPDATE Positions
    SET PosName = ?, RequiredQualification = ?
    WHERE PosID = ?
  `;

  db.query(sql, [PosName, RequiredQualification, id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update position",
      });
    }

    res.json({ message: "Position updated successfully" });
  });
});

/* DELETE position */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Positions WHERE PosID = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Cannot delete position because it may have employees",
      });
    }

    res.json({ message: "Position deleted successfully" });
  });
});

module.exports = router;