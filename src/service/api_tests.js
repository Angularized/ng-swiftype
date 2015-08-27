describe('ngSwiftype Service', function(){

  var $httpBackend,
      Api,
      params;


  beforeEach(module('ngSwiftype'));


  beforeEach(function() {
    angular.mock.inject(function($injector){
      
      $httpBackend = $injector.get('$httpBackend');
      
      Api = $injector.get('ngSwiftype.api');
    });
  });

  describe('search', function(){
    it('should return false if not passing an object type argument', function() {
      expect(Api.search()).toBeFalsy();
    });

    it('should return a promise', function() {
      params = {};
      expect(Api.search(params).then()).toBeDefined();
    });
  });

});