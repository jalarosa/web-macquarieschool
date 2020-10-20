let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/events', function(request,response) {
    let languaje = request.query.lang || storage.getLanguaje();
    let data = storage.getData(languaje);
    let menu = storage.getMenu(4, languaje);
    response.render('events', {"page_title": "Events", menu: menu, data: data});
});

module.exports = router;