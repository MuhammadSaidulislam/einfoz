const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
// registration
const registration = async (req, res, next) => {
    var db = req.db;
    const schema = Joi.object({
      mobile: Joi.string().min(3).required(),
      password: Joi.string().min(1).required(),
      user_name: Joi.string().optional(),
      image: Joi.string().base64().allow('').optional(),
      created_at: Joi.string().base64().allow('').optional(),
    });
  
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { mobile, password } = value;
  
    // Check if the username is already taken
    db.query("SELECT * FROM user WHERE mobile = ?", [mobile], (err, rows) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
  
      if (rows.length > 0) {
        res.status(409).json({ error: "mobile already exists" });
        return;
      }
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        var data = {
          mobile: mobile,
          password: hashedPassword,
          user_name: req.body.user_name,
          created_at: new Date()
        };
  
        // Check if an image was provided before adding it to the data object
        if (req.file && req.file.filename) {
          data.image = req.file.filename;
        }
        db.query(
          "INSERT INTO user set ?",
          [data],
          (err, result) => {
            if (err) {
              console.error("Error executing query: ", err);
              res.status(500).json({ error: "Internal server error" });
              return;
            }
            res.status(200).json({ mobile });
          }
        );
      });
    });
  };
  // update password
  const userPassword = async (req, res, next) => {
    var db = req.db;
    const mobile = req.params.mobile;
    const newPassword = req.body.newPassword;
  
    if (!newPassword || newPassword.length < 1) {
      return res.status(400).json({ error: "New password is invalid" });
    }
  
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing the password: ", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      const sql = "UPDATE user SET password = ? WHERE mobile = ?";
      db.query(sql, [hashedPassword, mobile], (err, result) => {
        if (err) {
          console.error("Error updating password: ", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({ error: "User not found", result });
          } else {
            res.status(200).json({ mobile });
          }
        }
      });
    });
  }
  // login
  const userLogin = async (req, res, next) => {
    // Validate request body using Joi
    var db = req.db;
    const { mobile, password } = req.body;
    // Retrieve the user from the database based on the username
    db.query("SELECT * FROM user WHERE mobile = ?", [mobile], (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return err;
      }
  
      if (rows.length === 0) {
        res.status(401).json({ error: "Authentication failed" });
        return;
      }
  
      const user = rows[0];
  
      // Compare the provided password with the stored hash
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
  
        if (!result) {
          res.status(401).json({ error: "Authentication failed" });
          return;
        }
        const token = jwt.sign({ mobile }, SECRET_KEY);
        //    res.status(200).json(result);
        if (result) {
          const { mobile } = rows[0];
          res.status(200).json({ mobile });
        } else {
          res.status(404).json({
            message: "User does not exist",
          });
        }
      });
    });
  };
  // login mobile number check
  const mobileNumberCheck = async (req, res, next) => {
    var db = req.db;
    const { mobileNumber } = req.body;
    db.query(
      "SELECT * FROM user WHERE mobile = ?",
      [mobileNumber],
      (error, results) => {
        if (error) {
          // Handle any database error
          console.error("Error executing query:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (results.length > 0) {
          // Mobile number exists
          return res.json({ exists: true });
        } else {
          // Mobile number does not exist
          return res.json({ exists: false });
        }
      }
    );
  };

  module.exports = {
    registration,
    userPassword,
    userLogin,
    mobileNumberCheck
}