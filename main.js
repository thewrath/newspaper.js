const express = require('express');
const axios = require("axios");
const cors = require("cors");
const path = require('path');

const ascii = require("ascii-art");

const app = express();

app.use(cors());
app.use(express.static('static'));

app.get('/newspaper', function(req, res){
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/get_rss/:rss_feed', function (req, res) {
    let rss_feed = decodeURI(req.params.rss_feed);
    axios.get(rss_feed).then(response => {
        console.log(rss_feed);
        res.header("Content-Type", "application/rss+xml");
        res.send(response.data);
    }).catch(error => {
        console.log("Erreur");
        console.log(error);
        res.data = error;
        res.send();
    });
    
});

app.listen(3000, function () {
  ascii.font('Newspaper.js RSS feed server', 'Doom');
});


