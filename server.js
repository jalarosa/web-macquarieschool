
var app = require('./app');
var port = 5050;

app.get('/', function(req, res) {

    res.sendFile(__dirname + "/public/lang/es/home.html");
});

app.get('/:page', function(req, res) {
    console.log("remaining " + req.params.page );
    res.sendFile(__dirname + "/public/lang/es/" + req.params.page );
});

app.get('/es/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.redirect('/'+ req.params.remaining);
});

app.get('/es/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/lang/es/" + req.params.remaining );
});

app.get('/en/css/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/css/" + req.params.remaining );
});

app.get('/en/css/msdropdown/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/css/msdropdown/" + req.params.remaining );
});

app.get('/en/js/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/js/" + req.params.remaining );
});

app.get('/en/js/greensock/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/js/greensock/" + req.params.remaining );
});

app.get('/en/js/jquery/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/js/jquery/" + req.params.remaining );
});

app.get('/en/js/msdropdown/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/js/msdropdown/" + req.params.remaining );
});


app.get('/en/images/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/images/" + req.params.remaining );
});

app.get('/en/images/msdropdown/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/images/msdropdown/" + req.params.remaining );
});


app.get('/es/:remaining', function(req, res) {
    console.log("remaining" + req.params.remaining );
    res.sendFile(__dirname + "/public/lang/es/" + req.params.remaining );
});


app.get('/:lang/:page', function(req, res) {
    res.sendFile(__dirname + "/public/lang/" + req.params.lang  +"/"+ req.params.page );
});


app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});