/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var http = require('http');
var url = require('url');

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

//declare our server's routes
var routes = {
  '/classes/messages': true
};

var dataObj = {
  results: []
};

var requestHandler = function(request, response) {
  // var urlParts = url.parse(request.url);
  var parts = url.parse(request.url);
  debugger;
  // console.log('Request', request);
  // console.log('parts', parts, routes);
  // console.log('Response_1: ', response);
  var route = routes[parts.pathname];
  if (route) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

    // Do some basic logging.
    //
    // Adding more logging to your server can be an easy way to get passive
    // debugging help, but you should always be careful about leaving stray
    // console.logs in your code.
    // console.log('Serving request type ' + request.method + ' for url ' + request.url);
    // console.log('Serving request type ' + request.method + ' for url ' + request.url);

    //we want to verify that the request is valid
    request.on('error', (err) => {
      console.log('ERROR:', err);
    });
    
    // The outgoing status.
    if (request.method === 'GET') {
      var statusCode = 200; 
      var returnData = JSON.stringify(dataObj);  
    } else if (request.method === 'OPTIONS') {
    
      var statusCode = 200;
      let body = {};
      body.Allow = defaultCorsHeaders['access-control-allow-methods'];
      // console.log('Options!',body);
      var returnData = JSON.stringify(body);
    } else if (request.method === 'POST') {
      var statusCode = 201;
      var returnData = '';
      let body = [];
      request.on('data', (dataIn) => {
        body.push(dataIn);
      });
      request.on('end', () => {
        body = Buffer.concat(body).toString(); //string
        var validObj = JSON.parse(body);
        dataObj.results.push(validObj);
        returnData = JSON.stringify(validObj);
        console.log('Data: ', returnData);
      });
       
    }
    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;

    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    headers['Content-Type'] = 'application/json';

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.

    response.end(returnData);
    // console.log('Response: ', response);
  } else {
    var headers = defaultCorsHeaders;
    response.writeHead(404, headers);
    response.end('ERROR');
  }
};

exports.requestHandler = requestHandler;