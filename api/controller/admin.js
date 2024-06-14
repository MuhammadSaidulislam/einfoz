const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
// registration
const adminRegistration = async (req, res, next) => {
    // Validate request body using Joi
    var db = req.db;
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    const { name, password } = value;
    // Check if the username is already taken
    db.query("SELECT * FROM admin WHERE name = ?", [name], (err, rows) => {
        if (err) {
            console.error("Error executing query: ", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (rows.length > 0) {
            res.status(409).json({ error: "mobile already exists" });
            return;
        }

        // Insert the user into the database
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            db.query(
                "INSERT INTO admin (name, password) VALUES (?, ?)",
                [name, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error("Error executing query: ", err);
                        res.status(500).json({ error: "Internal server error" });
                        return;
                    }

                    res.status(201).json({ message: "Registration successful!" });
                }
            );
        });
    });
};
// login
const adminLogin = async (req, res, next) => {
    // Validate request body using Joi
    var db = req.db;
    const { name, password } = req.body;
    // Retrieve the user from the database based on the username
    db.query("SELECT * FROM admin WHERE name = ?", [name], (err, rows) => {
        if (err) {
            console.error("Error executing query: ", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (rows.length === 0) {
            res.status(401).json({ error: "Authentication failed" });
            return;
        }

        const admin = rows[0];

        // Compare the provided password with the stored hash
        bcrypt.compare(password, admin.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords: ", err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }

            if (!result) {
                res.status(401).json({ error: "Authentication failed" });
                return;
            }

            res.status(200).json({ message: "Authentication successful!" });
        });
    });
};
// add category
const addCategory = async (req, res, next) => {
    var db = req.db;
    const { id, category_name, created_at } = req.body;

    if (!id || !category_name || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO category (id, category, created_at) VALUES (?, ?, ?)';
    db.query(query, [id, category_name, created_at], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Category created successfully', categoryId: results.insertId });
    });
} 
// category list
const getCategory = async (req, res, next) => {
    var db = req.db;
    const query = 'SELECT * FROM category ORDER BY created_at ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
}
// add category
const addSubCategory = async (req, res, next) => {
    var db = req.db;
    const { id, sub_category, created_at } = req.body;

    if (!id || !sub_category || !created_at) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO sub_category (id, sub_category, created_at) VALUES (?, ?, ?)';
    db.query(query, [id, sub_category, created_at], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Sub-Category created successfully', categoryId: results.insertId });
    });
} 
// sub-category list
const getSubCategory = async (req, res, next) => {
    var db = req.db;
    const query = 'SELECT * FROM sub_category ORDER BY created_at ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
}

module.exports = {
    adminRegistration,
    adminLogin,
    addCategory,
    getCategory,
    addSubCategory,
    getSubCategory
}