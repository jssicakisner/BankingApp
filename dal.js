const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://JessicaKisner:fullstackbankingapp@bankingapp.c4bwkvr.mongodb.net/?retryWrites=true&w=majority';
let db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    console.log('Connected to db server');
    db = client.db('BadBank').collection('users');
});

//create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db;
        const doc = {accountNumber: Math.floor(Math.random() * 1000000), name, email, password, balance: 0, loggedin: false};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
};

//login
function login(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
            });
        };

//set loggedin to true
function log(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .findOneAndUpdate({email: email},{$set: {loggedin: true}})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
            });
};

//set loggedin to false
function logO(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .findOneAndUpdate({email: email},{$set: {loggedin: false}})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
            });
};

// find loggedin user
function findOne() {
    return new Promise((resolve, reject) => {
        const customers = db
            .findOne({loggedin: true})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
};

//change password
function profile(email, password) {
    return new Promise((resolve, reject) => {
        const customers = db
            .findOneAndUpdate({email: email},{$set: {password: password}})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
};

//update
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .findOneAndUpdate(
                {email: email},
                {$set: {balance: amount}},
                {returnOriginal: false},
                function (err, docs) {
                    err ? reject(err) : resolve(docs)
                });
    });
};

//all users
function all () {
    return new Promise((resolve, reject) => {
        const customers = db
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
};

module.exports = {create, login, log, logO, profile, findOne, update, all};