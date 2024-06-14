const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");
// registration
const addProfile = async (req, res, next) => {
    try {
        var db = req.db;
        var data = {
          id: req.body.id,
          name: req.body.name ,
          image: req.file.filename,
          mobile: req.body.mobile,
          category: req.body.category,
          sub_category: req.body.sub_category,
          city: req.body.city,
          zone: req.body.zone,
          building_no: req.body.building_no,
          road_name: req.body.road_name,
          description: req.body.description,
          created_by: req.body.created_by,
          created_at: req.body.created_at
        };
    
        db.query("INSERT INTO profile SET ?", [data], function (err, rows) {
          if (err) {
            res.status(500).send({
              statusCode: 500,
              message: "Error",
            });
          } else {
            res.status(201).send({
              statusCode: 201,
              message: "Success",
            });
          }
        });
      } catch (error) {
        res.status(500).send({
          statusCode: 500,
          message: "Error",
        });
      }
};

// profile list
const profileList = async (req, res, next) => {
  var db = req.db;
  const query = 'SELECT * FROM profile';

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching data from the database:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
}

// profile active
const profileActive = async (req, res, next) => {
  var db = req.db;
  const profileId = req.params.id;
    const { active } = req.body;

    // Ensure 'active' is a boolean
    if (typeof active !== 'boolean') {
        res.status(400).send('Invalid input: active must be a boolean');
        return;
    }

    const query = 'UPDATE profile SET active = ? WHERE id = ?';

    db.query(query, [active, profileId], (err, results) => {
        if (err) {
            console.error('Error updating data in the database:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Profile not found');
            return;
        }
        res.send('Profile updated successfully');
    });
}

// user profile
const userProfileList = async (req, res, next) => {
  var db = req.db;
  const  created  = req.params.id;

  if (!created) {
    return res.status(400).json({ status: 400, error: 'Missing required parameter: created_by.' });
  }

  const sql = `
    SELECT * FROM profile 
    WHERE created_by = ? AND active = true
  `;

  db.query(sql, [created], (error, results) => {
    if (error) {
      console.error('Error fetching data from the database:', error);
      return res.status(500).json({ status: 500, error: 'Internal server error.' });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Profile List",
      profiles: results
    });
  });
}
// user profile
const viewProfile = async (req, res, next) => {
  var db = req.db;
  const profileId = req.params.id;

  if (!profileId) {
    return res.status(400).json({ status: 400, error: 'Missing required parameter: id.' });
  }

  const sql = 'SELECT * FROM profile WHERE id = ?';

  db.query(sql, [profileId], (error, results) => {
    if (error) {
      console.error('Error fetching data from the database:', error);
      return res.status(500).json({ status: 500, error: 'Internal server error.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 404, error: 'Profile not found.' });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Profile Data",
      data: results[0]
    });
  });
}
  
module.exports = {
    addProfile,
    profileList,
    profileActive,
    userProfileList,
    viewProfile
}