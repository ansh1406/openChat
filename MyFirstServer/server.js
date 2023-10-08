const port = process.env.PORT || 8080;
const express = require('express');
const fs = require('fs');
const util = require('util');
var app = express();
const readFl = util.promisify(fs.readFile);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');

});
app.get('/login.html', (req, res) => {

    res.sendFile(__dirname + '/login.html');

});
app.post('/chat', (req, res) => {
    console.log('Userame >>> ' + req.body.username);
    console.log('Message >>> ' + req.body.message);
    console.log("");
    res.send('done');
});
app.post('/login', (req, res) => {
    var username = req.body.username.toString();
    let password = req.body.password;
    let credentials;
    fs.readFile('credentials.json', async (error, data) => {
        credentials = await JSON.parse(data);
        if (credentials[username]) {
            if (credentials[username].password === password)
                res.json({ 'status': '1' });
            else res.json({ 'status': '0' });
        }
        else res.json({ 'status': '-1' });
    });
});
app.post('/login_alert', (req, res) => {
    console.log(req.body.username + ' logged in !');
    console.log('');
    res.json({ 'status': '1' });
});
app.post('/logout_alert', (req, res) => {
    console.log(req.body.username + ' logged out !');
    console.log('');
    res.json({ status: '1' });
});
app.listen(port);