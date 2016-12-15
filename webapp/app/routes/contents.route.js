"use strict";

var  express  =  require("express");
var  router  =  express.Router();
var  multer  =  require("multer");  // nécessite npm i multer
var  contentController  =  require('./../controllers/ContentController');

// Si l'on voulait sécuriser les accès au service web, il faudrait communiquer le token d'identification
// à chacune des requêtes.
var  multerMiddleware  =  multer({ "dest" :  "/tmp/" });

router.route('/contents')
  .get(contentController.list)
  .post(multerMiddleware.single("file"), contentController.create);

router.route('/contents/:contentId')
  .get(contentController.getContent);

module.exports  =  router;