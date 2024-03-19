// ENTRY POINT FILE FOR ALL ROUTES
//ROUTES ARE THE ENTRY POINT FOR ALL THE REQUEST COMING FROM THE BROWSER

const express = require('express');

//Express contains a module express.Router()
const router = express.Router();  

console.log("router is loaded");

router.get('/', homeContoller.home);

// router.use('/routerName', require('./routerfile));    
// {Entry point file index.js will further routes to diff routes files}
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

router.use('/api', require('./api'));

module.exports = router;