const pushover = require('pushover');
const repos = pushover('/tmp/repos');
const express = require('express');
const path = require('path');
repos.on('push', function(push) {
  console.log('push ' + push.repo + '/' + push.commit +
    ' (' + push.branch + ')',
  );
  push.accept();
});

repos.on('fetch', function(fetch) {
  console.log('fetch ' + fetch.repo + '/' + fetch.commit);
  fetch.accept();
});

function authentication(req, res, next) {
  const authheader = req.headers.authorization;
  console.log(req.headers);

  if (!authheader) {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  const auth = new Buffer.from(authheader.split(' ')[1], 
      'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (user == 'a4' && pass == '123') {
    // If Authorized user
    next();
  } else {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

const app = express();
app.use('/console', express.static(__dirname + '/frontend'));
app.use('/git', authentication);
app.use('/git', function(req, res, next) {
  repos.handle(req, res);
});
app.listen(7005);


