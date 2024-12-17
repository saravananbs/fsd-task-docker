const express = require('express');
const router = express.Router();
const db = require('../db');

// Add Employee
router.post('/add', async (req, res) => {
    const { name, employee_id, email, phone_number, department, date_of_joining, role } = req.body;

    if (!name || !employee_id || !email || !phone_number || !department || !date_of_joining || !role) {
        return res.status(400).json({ error: 'All fields are mandatory' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO employees (name, employee_id, email, phone_number, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, employee_id, email, phone_number, department, date_of_joining, role]
        );
        res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Employee ID or Email already exists' });
        } else {
            res.status(500).json({ error: 'Database error' });
        }
    }
});

// Fetch All Employees
router.get('/', async (req, res) => {
    try {
        const [employees] = await db.query(`SELECT * FROM employees`);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Update Employee
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, department, date_of_joining, role } = req.body;

    try {
        await db.query(
            `UPDATE employees SET name=?, email=?, phone_number=?, department=?, date_of_joining=?, role=? WHERE id=?`,
            [name, email, phone_number, department, date_of_joining, role, id]
        );
        res.json({ message: 'Employee updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Delete Employee
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM employees WHERE id=?`, [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
