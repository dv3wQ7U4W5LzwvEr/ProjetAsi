"use strict";

var express = require("express");
var router = express.Router();

var CONFIG = JSON.parse(process.env.CONFIG);

var multer = require("multer");
var multerMiddleware = multer({ dest: CONFIG.tempUploadDirectory });

var contentController = require('../controllers/ContentController');

router.route('/contents')
  .get(contentController.list)
  .post(multerMiddleware.single("file"), contentController.create);

router.route('/contents/:contentId')
  .get(contentController.getContent);

module.exports = router;