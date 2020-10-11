let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/contact', function(request,response) {
    let languaje = request.query.lang || storage.getLanguaje();
    let data = storage.getData(languaje);
    let menu = storage.getMenu(2, languaje);
    response.render('contact', {"page_title": "Contact", menu: menu, data: data});
});

module.exports = router;