let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/courses', function(request,response) {
    let languaje = request.query.lang || storage.getLanguaje();
    let data = storage.getData(languaje);
    let menu = storage.getMenu(1, languaje);
    response.render('courses', {"page_title": "Courses", menu: menu, data: data});
});

module.exports = router;