var request = require('request');

var expect = require('chai').expect;

describe('START OUR SPEC TEST', function() {

  it('should respond with 200 and a list of allowed methods', function(done) {
    console.log('SPEC IS RUNNING');
    var requestParams = {method: 'OPTIONS', uri: 'http://127.0.0.1:3000/classes/messages'};
    request(requestParams, function(error, response, body) {
      var testBody = JSON.parse(body);
      expect(response.statusCode).to.equal(200);        
      expect(testBody.Allow).to.equal('GET, POST, PUT, DELETE, OPTIONS');
      done();
    });
        
  });

});


//The done() callback is used by Mocha to terminate asynchronous tests
 