describe('ngSwiftype.Autocomplete', function(){

  var $scope,
      $controller,
      $compile,
      element,
      mock_keyup;

  beforeEach(module('ngSwiftype'));

  beforeEach(function() {

    angular.mock.inject(function ($injector) {
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope');

      element = angular.element('<div class="swiftype-autocomplete" engine-key="12345" >{{1+1}}</div>');
      element = $compile(element)($scope);
      
      $scope.$digest();

    });
  });
  
  it('should have an engine_key', function() {

    expect($scope.engine_key).toBe('12345');

  });

  describe('key handling', function() {
    beforeEach(function() {
      mock_keyup = {
        keyCode: 55
      };
      $scope.term = 'killing';
      $scope.results = 'some results';
      $scope.page = 1;
    });

    it('should ignore arrow keys and shift key', function() {    
      mock_keyup = {};
      mock_keyup.keyCode = 37;
      expect($scope.keyup(mock_keyup)).toBeFalsy();
      
      mock_keyup = {};
      mock_keyup.which = 42;
      expect($scope.keyup(mock_keyup)).toBeFalsy();

      mock_keyup = {};
      mock_keyup.which = 16;
      expect($scope.keyup(mock_keyup)).toBeFalsy();

    });

    it('should reset search result if searching term character count < 2', function() {
      $scope.term = 'ki';
      $scope.keyup(mock_keyup);
      expect($scope.results).toEqual({});
    });
  });

  

});
