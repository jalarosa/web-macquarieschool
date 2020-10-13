let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/virtualClasses', function(request,response) {
    let languaje = request.query.lang || storage.getLanguaje();
    let data = storage.getData(languaje);
    let menu = storage.getMenu(2, languaje);
    response.render('virtual_classes', {"page_title": "Virtual Classes", menu: menu, data: data});
});

module.exports = router;