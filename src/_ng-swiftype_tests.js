describe('ngSwiftype', function(){

  beforeEach(module('ngSwiftype'));

  // override the environment variable setting to pass the test
  beforeEach(module(function($provide) {
    $provide.constant('application_id', 'www');
  }));

  it('should have an API application id',inject(function(application_id){
    expect(application_id).toBe('www');
  }));

});
