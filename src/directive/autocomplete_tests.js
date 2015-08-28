describe('ngSwiftype.Autocomplete', function(){

  var $scope,
      $controller,
      $compile,
      $httpBackend,
      element,
      mock_results,
      mock_keyup,
      query_function;

  beforeEach(module('ngSwiftype'));

  beforeEach(function() {

    angular.mock.inject(function ($injector) {
      $compile = $injector.get('$compile');
      $scope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');

      query_function = jasmine.createSpy('query_from_swiftype');

      mock_results = {
        "records": {
          "page": [
            {
              "body": "Band of Brothers DVD",
              "external_id": "9508ace2e1ba669854eb49fbe9429952ff1a6d4c",
              "sections": "",
              "title": "Band of Brothers",
              "updated_at": "2013-02-04T19:09:40Z",
              "image": "",
              "type": "post",
              "url": "http://yoursite.com/band-of-brothers",
              "popularity": 1,
              "published_at": "2012-01-01T08:00:00Z",
              "info": "",
              "id": "5025a3036052f6b650000006",
              "_score": 3.1224604,
              "highlight": {
                "title": "Band of <em>Brothers</em>",
                "body": "Band of <em>Brothers</em> DVD"
              },
            }
          ]
        },
        "info": {
          "page": {
            "query": "brothers",
            "current_page": 1,
            "num_pages": 1,
            "per_page": 20,
            "total_result_count": 1,
            "facets": {}
          }
        }
      };


    });
  });

  it('should report error if there is no engine_key', function() {
    element = angular.element('<div class="swiftype-autocomplete"></div>');
    element = $compile(element)($scope);
    $scope.$digest();

    expect($scope.error).toBeDefined();
    expect($scope.engine_key).toBe(undefined);

  });
  
  it('should have an engine_key', function() {
    element = angular.element('<div class="swiftype-autocomplete" engine-key="12345"></div>');
    element = $compile(element)($scope);
    $scope.$digest();
    expect($scope.engine_key).toBe('12345');
  });

  it('should able to resove the fetch-fields attribute', function() {
    element = angular.element('<div class="swiftype-autocomplete" engine-key="12345" fetch-fields=\'{"document_type": ["field_1", "field_1"]}\'></div>');
    element = $compile(element)($scope);
    $scope.$digest();
    expect($scope.fetch_fields).toEqual({document_type: ['field_1', 'field_1']});
  });

  it('should able to resove the search-fields attribute', function() {
    
  });

  describe('key handling', function() {
    beforeEach(function() {

      element = angular.element('<div class="swiftype-autocomplete" engine-key="12345" ></div>');
      element = $compile(element)($scope);

      mock_keyup = {
        keyCode: 55
      };

      $scope.term = 'this';
      $scope.results = 'that';
      $scope.page = 1;

    });

    it('should initiate empty $scope.results', function() {
      $scope.results = {};
      expect($scope.results).toBeDefined();
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
      $scope.term = 'th';
      $scope.keyup(mock_keyup);

      expect($scope.results).toEqual({});
    });

  });

  describe('Search', function() {
    beforeEach(function() {
      element = angular.element('<div class="swiftype-autocomplete" engine-key="12345" ></div>');
      element = $compile(element)($scope);

      mock_keyup = {
        keyCode: 55
      };

      $scope.term = 'this';

    });
    
    it('should able to resolve search results', function() {
      
      $scope.results = {};
      $httpBackend.whenPOST(/.*/).respond(mock_results);
      $scope.keyup(mock_keyup);
      $httpBackend.flush();

      expect($scope.results).not.toEqual({});
    });

    it('should able to search by page number', function() {
      $scope.results = {};
      $httpBackend.whenPOST(/.*/).respond(mock_results);

      $scope.search_by(2);

      $httpBackend.flush();
      expect($scope.results).not.toEqual({});
    });
  });
  

});
