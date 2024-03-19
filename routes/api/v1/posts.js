const express = require('express');
const router = express.Router();

const postApi = require("../../../controllers/api/v1/posts_api");

router.get('/', postApi.index);
router.deleted('/:id', passport.checkAuthenticate('jwt', {session: false}), postApi.destroy);

module.exports = router;