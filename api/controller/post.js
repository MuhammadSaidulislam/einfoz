const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");

const addPost = async (req, res, next) => {
    try {
        var db = req.db;
        var data = {
          id: req.body.id,
          name: req.body.name,
          image: req.file.filename,
          category: req.body.category,
          profile: req.body.sub_category,
          description: req.body.description,
          created_by: req.body.created_by,
          created_at: req.body.created_at
        };

    
        db.query("INSERT INTO post SET ?", [data], function (err, rows) {
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

// post list
const postList = async (req, res, next) => {
  var db = req.db;
  const query = `
    SELECT post.*, profile.name as profile_name
    FROM post 
    JOIN profile ON post.profile = profile.id
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

// post active
const postActive = async (req, res, next) => {
  var db = req.db;
  const profileId = req.params.id;
    const { active } = req.body;

    // Ensure 'active' is a boolean
    if (typeof active !== 'boolean') {
        res.status(400).send('Invalid input: active must be a boolean');
        return;
    }

    const query = 'UPDATE post SET active = ? WHERE id = ?';
    console.log('err',active,profileId);
    db.query(query, [active, profileId], (err, results) => {
      
        if (err) {
            console.error('Error updating data in the database:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('post not found');
            return;
        }
        res.send('post updated successfully');
    });
}

// user post
const userPostList = async (req, res, next) => {
  var db = req.db;
  const  created  = req.params.id;

  if (!created) {
    return res.status(400).json({ status: 400, error: 'Missing required parameter: created_by.' });
  }

  
  const sql = `
  SELECT post.*, profile.name as profile_name, profile.image as profile_image
  FROM post 
  JOIN profile ON post.profile = profile.id
  WHERE post.created_by = ? AND post.active = true
`;

  db.query(sql, [created], (error, results) => {
    if (error) {
      console.error('Error fetching data from the database:', error);
      return res.status(500).json({ status: 500, error: 'Internal server error.' });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Post List",
      posts: results
    });
  });
}

// get post
const viewPost = async (req, res, next) => {
  try {
    const db = req.db;
    const postId = req.params.id; // Assuming the post ID is passed as a URL parameter
    const sql = `
      SELECT 
        po.id AS post_id, 
        po.name AS post_name, 
        po.image AS post_image, 
        po.description AS post_description, 
        po.category AS post_category, 
        po.created_at AS post_created_at,
        pr.id AS profile_id,
        pr.name AS profile_name, 
        pr.image AS profile_image 
      FROM post po
      LEFT JOIN profile pr ON po.profile = pr.id
      WHERE po.id = ?;
    `;

    db.query(sql, [postId], (error, results) => {
      if (error) {
        console.error('Error fetching data from the database:', error);
        return res.status(500).json({ status: 500, error: 'Internal server error.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ status: 404, message: 'Post not found.' });
      }

      const postData = {
        id: results[0].post_id,
        name: results[0].post_name,
        image: results[0].post_image,
        description: results[0].post_description,
        category: results[0].post_category,
        created_at: results[0].post_created_at,
        profile_name: results[0].profile_name,
        profile_image: results[0].profile_image
      };

      res.status(200).json({
        statusCode: 200,
        message: "Post Data",
        data: postData
      });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ status: 500, error: 'Internal server error.' });
  }
}


module.exports = {
    addPost,
    postList,
    postActive,
    userPostList,
    viewPost
}