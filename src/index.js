let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/', function(request,response) {
  let languaje = request.query.lang || 'es';
  storage.setLanguaje(languaje);
  response.redirect('/home?lang=' + languaje);
});

router.get('/home', function(request,response) {
  let languaje = request.query.lang || storage.getLanguaje();
  let data = storage.getData(languaje);
  let menu = storage.getMenu(0, languaje);
  response.render('index', {"page_title": "Macquarie School of English", menu: menu, data: data});
});

module.exports = router;