describe('ngSwiftype Service', function(){

  var Api,
      params;


  beforeEach(module('ngSwiftype'));


  beforeEach(function() {
    angular.mock.inject(function($injector){
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