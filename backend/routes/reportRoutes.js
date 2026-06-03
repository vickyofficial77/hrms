const express = require("express");
const db = require("../db");

const router = express.Router();

/* REPORT: Employees on leave */
router.get("/on-leave", (req, res) => {
  const sql = `
    SELECT 
      e.EmpID,
      CONCAT(e.EmpFirstName, ' ', e.EmpLastName) AS FullName,
      e.EmpGender,
      e.EmpEmail,
      e.EmpTelephone,
      e.EmpStatus,
      d.DepartName,
      p.PosName
    FROM Employee e
    JOIN Department d ON e.DepartID = d.DepartID
    JOIN Positions p ON e.PosID = p.PosID
    WHERE e.EmpStatus = 'on leave'
    ORDER BY e.EmpID DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to generate report",
      });
    }

    res.json(results);
  });
});

module.exports = router;