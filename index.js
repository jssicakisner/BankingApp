var express = require('express');
var cors = require('cors');
var dal = require('./dal.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var app = express();
var port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    //origin:"http://localhost:3000",
    origin: port,
    credentials: true
}));
app.use(expressSession({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("secretcode"));

//serve static files
app.use(express.static('public'));

//create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(req.params.name, req.params.email, req.params.password).then((user) => {
        res.send(user);
    });
});

//login
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).then((user, err) => {
        if (err) throw err;
        else if (user == null) {
            res.send({result: "No User Exists"});
            return;
        } else if (user.password !== req.params.password) {
            console.log('Invalid Password');
            res.send({result: user.password});
            console.log({result: user.password});
            return;
        } else {
            dal.log(req.params.email).then((user, err) => {
                if (err) throw err;
                else console.log('Welcome to the bank');
            });
        }
        })
    });

//logout
app.get('/account/logout/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).then((user, err) => {
        if (err) throw err;
        else if (user == null) {
            res.send({result: "No User Exists"});
            return;
        } else if (user.password !== req.params.password) {
            res.send({result: "Invaild Password"});
            return;
        } else {
            dal.logO(req.params.email).then((user, err) => {
                if(err) throw err;
                console.log('See you next time');
            });
        }
        })
    });

//update money
app.get('/account/update/:email/:amount', function (req,res) {
    dal.update(req.params.email, Number(req.params.amount)).then((user) => {
        res.send(user);
    });
});

//get loggedin user
app.get('/account/loggedin', function (req,res) {
    dal.findOne().then((user) => {
        res.send(user);
    });
});

//update profile
app.get('/account/profile/:email/:password', function (req,res) {
    dal.profile(req.params.email, req.params.password).then((user) => {
        res.send(user);
    });
});

//all accounts
app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        res.send(docs);
    });
});

//var port = 3000;
app.listen(port);
console.log('Running on port: ' +port);
