const port = process.env.PORT || 8080;
const express = require('express');
const fs = require('fs');
var app = express();
var chats =new Array();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/Website/Layouts'));
app.use(express.static(__dirname+'/Website/JavaScript'));
app.use(express.static(__dirname+'/Website/StyleSheets'));
app.use(express.static(__dirname+'/Website/Assets'));
app.post('/chat', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;
    console.log('Userame >>> ' + username);
    console.log('Message >>> ' + message);
    console.log("");
    chats.push({
        chat: message,
        user:username
    });
    res.json({ user: username, message: message });
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
app.post('/getChat', (req, res) => {
    let chatsToSend = new Array();
    for (let i = req.body.chatCount; i < chats.length; i++) {
        chatsToSend.push(chats[i]);
    }
    res.json(chatsToSend);
});
app.listen(port);