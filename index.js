var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');​
//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
    console.log('Database Error:', err);
});​​​
app.get("/", function(req, res) {
    request('https://news.ycombinator.com/', function(error, response, html) {
        var $ = cheerio.load(html);
        //console.log(response);
        $('.title').each(function(index) {
            var title = $(this).children('a').text();
            var link = $(this).children('a').attr('href');
            console.log(title);
            console.log(link);
            db.scrapedData.save({
                title: title,
                link: link
            });
        });​​
    });

    ​
});
app.listen(3000, function() {
    console.log('App running on port 3004!');
});
