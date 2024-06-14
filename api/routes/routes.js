const express = require('express');
const router = express.Router();
const multer = require("multer");
const admin = require("../controller/admin");
const user = require("../controller/user");
const profile = require("../controller/profile");
const post = require("../controller/post");
const service= require("../controller/service");
const home = require("../controller/home");
// image path
const storage = multer.diskStorage({
    destination: './image',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
});
const upload = multer({
    storage: storage
})

// home
router.get('/homeData', home.homeData)
// admin
router.post('/adminRegistration', admin.adminRegistration)
router.post('/adminLogin', admin.adminLogin)
router.post('/addCategory', admin.addCategory)
router.post('/addSubCategory', admin.addSubCategory)
router.get('/getCategory', admin.getCategory)
router.get('/getSubCategory', admin.getSubCategory)
// user
router.post('/registration', upload.single('image'), user.registration)
router.put('/userPassword/:mobile', user.userPassword)
router.post('/userLogin', user.userLogin)
router.post('/mobileNumberCheck',  user.mobileNumberCheck)
// profile
router.post('/addProfile', upload.single('image'), profile.addProfile)
router.get('/profileList', profile.profileList)
router.put('/profileActive/:id', profile.profileActive)
router.get('/userProfileList/:id', profile.userProfileList)
router.get('/viewProfile/:id', profile.viewProfile)

// post
router.post('/addPost', upload.single('image'), post.addPost)
router.get('/postList', post.postList)
router.put('/postActive/:id', post.postActive)
router.get('/userPostList/:id', post.userPostList)
router.get('/viewPost/:id', post.viewPost)

// service
router.post('/addService', upload.single('image'), service.addService)
router.get('/serviceList', service.serviceList)
router.put('/serviceActive/:id', service.serviceActive)
router.get('/userServiceList/:id', service.userServiceList)
router.get('/viewService/:id', service.viewService)



module.exports = router;