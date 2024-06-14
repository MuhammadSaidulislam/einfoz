const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");

const addService = async (req, res, next) => {
  try {
    var db = req.db;
    var data = {
      id: req.body.id,
      name: req.body.name,
      image: req.file.filename,
      profile: req.body.profile,
      category: req.body.category,
      price: req.body.price,
      details: req.body.details,
      created_by: req.body.created_by,
      created_at: req.body.created_at
    };

    db.query("INSERT INTO service SET ?", [data], function (err, rows) {
      console.log('err', err);
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

// service list
const serviceList = async (req, res, next) => {
  var db = req.db;

  const query = `
  SELECT service.*, profile.name as profile_name
  FROM service 
  JOIN profile ON service.profile = profile.id
`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
}

// service active
const serviceActive = async (req, res, next) => {
  var db = req.db;
  const profileId = req.params.id;
  const { active } = req.body;

  // Ensure 'active' is a boolean
  if (typeof active !== 'boolean') {
    res.status(400).send('Invalid input: active must be a boolean');
    return;
  }

  const query = 'UPDATE service SET active = ? WHERE id = ?';

  db.query(query, [active, profileId], (err, results) => {
    if (err) {
      console.error('Error updating data in the database:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('service not found');
      return;
    }
    res.send('service updated successfully');
  });
}

// user service
const userServiceList = async (req, res, next) => {
  var db = req.db;
  const created = req.params.id;

  if (!created) {
    return res.status(400).json({ status: 400, error: 'Missing required parameter: created_by.' });
  }

  // const sql = `
  //   SELECT * FROM service 
  //   WHERE created_by = ? AND active = true
  // `;
  console.log('created', created);
  const sql = `
  SELECT service.*, profile.name as profile_name, profile.image as profile_image
  FROM service 
  JOIN profile ON service.profile = profile.id
  WHERE service.created_by = ? AND service.active = true
`;

  db.query(sql, [created], (error, results) => {
    if (error) {
      console.error('Error fetching data from the database:', error);
      return res.status(500).json({ status: 500, error: 'Internal server error.' });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Service List",
      services: results
    });
  });
}

// get service
const viewService = async (req, res, next) => {
  try {
    const db = req.db;
    const postId = req.params.id; // Assuming the post ID is passed as a URL parameter
    const sql = `
      SELECT 
        po.id AS service_id, 
        po.name AS service_name, 
        po.image AS service_image, 
        po.description AS service_description, 
        po.category AS service_category, 
        po.created_at AS service_created_at,
        pr.id AS profile_id,
        pr.name AS profile_name, 
        pr.image AS profile_image 
      FROM service po
      LEFT JOIN profile pr ON po.profile = pr.id
      WHERE po.id = ?;
    `;

    db.query(sql, [postId], (error, results) => {
      if (error) {
        console.error('Error fetching data from the database:', error);
        return res.status(500).json({ status: 500, error: 'Internal server error.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ status: 404, message: 'Service not found.' });
      }

      const serviceData = {
        id: results[0].service_id,
        name: results[0].service_name,
        image: results[0].service_image,
        description: results[0].service_description,
        category: results[0].service_category,
        created_at: results[0].service_created_at,
        profile_name: results[0].profile_name,
        profile_image: results[0].profile_image
      };

      res.status(200).json({
        statusCode: 200,
        message: "Service Data",
        data: serviceData
      });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ status: 500, error: 'Internal server error.' });
  }
}

module.exports = {
  addService,
  serviceList,
  serviceActive,
  userServiceList,
  viewService
}