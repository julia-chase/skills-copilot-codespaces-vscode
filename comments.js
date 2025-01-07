//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = [];
http.createServer(function(req, res){
    //Parse the request URL
    var urlObj = url.parse(req.url, true);
    //If the request URL is /post, it means the client is submitting a comment
    if(urlObj.pathname == '/post'){
        //Get the comment from the query string
        var comment = urlObj.query.comment;
        //If the comment is not empty, save it
        if(comment != ''){
            comments.push(comment);
        }
        //Send a response
        res.end();
    } else if(urlObj.pathname == '/get'){
        //If the request URL is /get, it means the client is polling for new comments
        //Send the comments back to the client
        res.end(JSON.stringify(comments));
    } else {
        //Read the HTML file
        fs.readFile('index.html', function(err, data){
            //Send the contents of the HTML file to the client
            res.end(data);
        });
    }
}).listen(8080);
//End of comments.js