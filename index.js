var pushover = require('pushover');
var repos = pushover('/tmp/repos');
var express = require('express');
const path = require('path');
repos.on('push', function (push) {
    console.log('push ' + push.repo + '/' + push.commit
        + ' (' + push.branch + ')'
    );
    push.accept();
});

repos.on('fetch', function (fetch) {
    console.log('fetch ' + fetch.repo + '/' + fetch.commit);
    fetch.accept();
});

function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
 
    if (user == 'a4' && pass == '123') {
 
        // If Authorized user
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
 
}
var app = express()
.use('/console',express.static(__dirname + '/frontend'))
.use('/git',authentication)

.use('/git',function(req, res, next){
       
        repos.handle(req, res);
        
    })
    .listen(7005);


