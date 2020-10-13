let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/css/:remaining', function (req, res) {
    console.log("remaining - " + req.params.remaining);
    res.sendFile(__dirname + "/assets/css/" + req.params.remaining);
});

router.get('/js/:remaining', function (req, res) {
    console.log("remaining - " + req.params.remaining);
    res.sendFile(__dirname + "/assets/js/" + req.params.remaining);
});

router.get('/images/:remaining', function (req, res) {
    console.log("remaining - " + req.params.remaining);
    res.sendFile(__dirname + "/assets/images/" + req.params.remaining);
});

router.get('/js/greensock/:remaining', function(req, res) {
    console.log("remaining - " + req.params.remaining );
    res.sendFile(__dirname + "/assets/js/greensock/" + req.params.remaining );
});

module.exports = router;