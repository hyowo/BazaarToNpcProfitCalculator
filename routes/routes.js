var router = require('express').Router();

router.get("/", require("../controllers/landingController").get);

module.exports = router;