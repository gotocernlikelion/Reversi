/* include the static file webserver library*/
var static = require('node-static');

/* include the http server library */
var http = require('http');

/* Assume that we are running on Heroku */
var port = process.env.PORT;
var directory = __dirname + '/public';


/* if we aren't on heroku, then we need to readjust the port and directory
* information and we know that because port won't be set*/
if(typeof port == 'undefined' || !port){
  directory = './public'
  port = 8080;
}

/* Set up a static web server that will deliver files from the filesystem */
var file = new static.Server(directory);

/*Construct an http server that get files from the file server */
var app = http.createServer(
  function(request,response){
    request.addListener('end',
      function(){
        file.serve(request,response);
      }
    ).resume();
  }
).listen(port);

console.log('The Server is running');
