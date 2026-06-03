const express = require("express");
const db = require("../db");

const router = express.Router();

/* CREATE employee */
router.post("/", (req, res) => {
  const {
    EmpFirstName,
    EmpLastName,
    EmpGender,
    EmpDateOfBirth,
    EmpEmail,
    EmpTelephone,
    EmpAddress,
    EmpHireDate,
    EmpStatus,
    DepartID,
    PosID,
  } = req.body;

  if (
    !EmpFirstName ||
    !EmpLastName ||
    !EmpGender ||
    !EmpDateOfBirth ||
    !EmpEmail ||
    !EmpTelephone ||
    !EmpAddress ||
    !EmpHireDate ||
    !EmpStatus ||
    !DepartID ||
    !PosID
  ) {
    return res.status(400).json({ message: "All employee fields are required" });
  }

  const sql = `
    INSERT INTO Employee
    (
      EmpFirstName,
      EmpLastName,
      EmpGender,
      EmpDateOfBirth,
      EmpEmail,
      EmpTelephone,
      EmpAddress,
      EmpHireDate,
      EmpStatus,
      DepartID,
      PosID
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      EmpFirstName,
      EmpLastName,
      EmpGender,
      EmpDateOfBirth,
      EmpEmail,
      EmpTelephone,
      EmpAddress,
      EmpHireDate,
      EmpStatus,
      DepartID,
      PosID,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Employee email already exists or server error",
        });
      }

      res.status(201).json({
        message: "Employee created successfully",
        employeeId: result.insertId,
      });
    }
  );
});

/* READ all employees with department and position */
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      e.EmpID,
      e.EmpFirstName,
      e.EmpLastName,
      e.EmpGender,
      e.EmpDateOfBirth,
      e.EmpEmail,
      e.EmpTelephone,
      e.EmpAddress,
      e.EmpHireDate,
      e.EmpStatus,
      d.DepartName,
      p.PosName,
      e.DepartID,
      e.PosID
    FROM Employee e
    JOIN Department d ON e.DepartID = d.DepartID
    JOIN Positions p ON e.PosID = p.PosID
    ORDER BY e.EmpID DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch employees",
      });
    }

    res.json(results);
  });
});

/* SEARCH employee by name, email, telephone, department, position, or status */
router.get("/search/:keyword", (req, res) => {
  const { keyword } = req.params;

  const searchValue = `%${keyword}%`;

  const sql = `
    SELECT 
      e.EmpID,
      e.EmpFirstName,
      e.EmpLastName,
      e.EmpGender,
      e.EmpDateOfBirth,
      e.EmpEmail,
      e.EmpTelephone,
      e.EmpAddress,
      e.EmpHireDate,
      e.EmpStatus,
      d.DepartName,
      p.PosName,
      e.DepartID,
      e.PosID
    FROM Employee e
    JOIN Department d ON e.DepartID = d.DepartID
    JOIN Positions p ON e.PosID = p.PosID
    WHERE 
      e.EmpFirstName LIKE ?
      OR e.EmpLastName LIKE ?
      OR e.EmpEmail LIKE ?
      OR e.EmpTelephone LIKE ?
      OR d.DepartName LIKE ?
      OR p.PosName LIKE ?
      OR e.EmpStatus LIKE ?
    ORDER BY e.EmpID DESC
  `;

  db.query(
    sql,
    [
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Search failed",
        });
      }

      res.json(results);
    }
  );
});

/* UPDATE employee */
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    EmpFirstName,
    EmpLastName,
    EmpGender,
    EmpDateOfBirth,
    EmpEmail,
    EmpTelephone,
    EmpAddress,
    EmpHireDate,
    EmpStatus,
    DepartID,
    PosID,
  } = req.body;

  const sql = `
    UPDATE Employee
    SET 
      EmpFirstName = ?,
      EmpLastName = ?,
      EmpGender = ?,
      EmpDateOfBirth = ?,
      EmpEmail = ?,
      EmpTelephone = ?,
      EmpAddress = ?,
      EmpHireDate = ?,
      EmpStatus = ?,
      DepartID = ?,
      PosID = ?
    WHERE EmpID = ?
  `;

  db.query(
    sql,
    [
      EmpFirstName,
      EmpLastName,
      EmpGender,
      EmpDateOfBirth,
      EmpEmail,
      EmpTelephone,
      EmpAddress,
      EmpHireDate,
      EmpStatus,
      DepartID,
      PosID,
      id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update employee",
        });
      }

      res.json({
        message: "Employee updated successfully",
      });
    }
  );
});

/* DELETE employee */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Employee WHERE EmpID = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete employee",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });
  });
});

module.exports = router;