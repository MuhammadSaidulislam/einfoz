const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "course-api";
const Joi = require("joi");

const homeData = async (req, res, next) => {
  try {
    const db = req.db;

    const sql = `
    SELECT 
      'profile' AS type, 
      p.id, 
      p.name, 
      p.image, 
      p.category, 
      p.mobile AS share, 
      p.image AS profile_image, 
      p.road_name AS profile_name, 
      NULL AS price, 
      p.created_at 
    FROM profile p
    WHERE p.active = true
    UNION ALL
    SELECT 
      'service' AS type, 
      s.id, 
      s.name, 
      s.image, 
      s.category, 
      'shop' AS share, 
      pr.image AS profile_image, 
      pr.name AS profile_name, 
      s.price, 
      s.created_at 
    FROM service s
    LEFT JOIN profile pr ON s.profile = pr.id
    UNION ALL
    SELECT 
      'post' AS type, 
      po.id, 
      po.name, 
      po.image, 
      po.category, 
      'like' AS share, 
      pr.image AS profile_image, 
      pr.name AS profile_name, 
      NULL AS price, 
      po.created_at 
    FROM post po
    LEFT JOIN profile pr ON po.profile = pr.id
    ORDER BY created_at DESC;
  `;


    db.query(sql, (error, results) => {
      if (error) {
        console.error('Error fetching data from the database:', error);
        return res.status(500).json({ status: 500, error: 'Internal server error.' });
      }

      const mergedData = results.map(row => ({
        type: row.type,
        id: row.id,
        name: row.name,
        image: row.image,
        category: row.category,
        profile_name: row.profile_name,
        profile_image: row.profile_image,
        share: row.share,
        price: row.price,
        created_at: row.created_at
      }));

      res.status(200).json({
        statusCode: 200,
        message: "Merged Data",
        data: mergedData
      });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ status: 500, error: 'Internal server error.' });
  }
}

module.exports = {
  homeData
}