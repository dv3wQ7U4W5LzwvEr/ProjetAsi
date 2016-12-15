// user.route.js
"use strict";
var  express  =  require("express");
var  router  =  express.Router();
module.exports  =  router;
var  slidController  =  require('./../controllers/SlidController');

// Si l'on voulait sécuriser les accès au service web, il faudrait communiquer le token d'identification
// à chacune des requêtes.
router.route('/slids')
  .get(slidController.list)
  .post(slidController.create);

router.route('/slids/:slidId')
  .get(slidController.getSlide);