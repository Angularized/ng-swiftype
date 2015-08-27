describe('API Service', function(){

  beforeEach(module('ngSwiftype'));

  // override the environment variable setting to pass the test
  beforeEach(function() {
    module(function($provide) {
      $provide.constant('application_id', 'www');
    });
  });


});