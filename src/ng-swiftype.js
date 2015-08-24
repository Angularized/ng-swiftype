angular.module('ngSwiftype', []);

angular.module('ngSwiftype')

.factory('ngSwiftype.cache', [ '$cacheFactory', function($cacheFactory){
  return $cacheFactory('cache');
}])

.service('ngSwiftype.api', [ '$http', 'ngSwiftype.cache', function($http, SwiftypeCache ) {

  var endpoint = 'https://api.swiftype.com/api/v1/public/engines/suggest.json';

  this.search = function(params) {

    var config = params || {};

    config.q = params.q;
    config.engine_key = params.engine_key;
    config.page = params.page || 1;
    config.per_page = params.per_page || 20;
    config.search_fields = params.search_fields;
    config.fetch_fields = params.fetch_fields;
    config.filters = params.filters;
    config.document_types = params.document_types;
    config.functional_boosts = params.functional_boosts;
    config.sort_field = params.sort_field;
    config.sort_direction = params.sort_direction;

    return $http({
      method: 'POST',
      url: endpoint,
      params: config,
      cache: SwiftypeCache
    });
  }
}])

.directive('swiftypeAutocomplete', [ 'ngSwiftype.api', function(api){

  var SwiftypeController = ['$scope', function( $scope ) {
    
    $scope.results = {},
    $scope.error = {},
    $scope.loading = false;

    var params = {};

    function success_handler(response) {

      var info = response.data.info,
          records = response.data.records,
          total_records = 0;

      for(key in info) {
        $scope.results[key] = info[key];
        $scope.results[key].records = records[key];

        total_records += info[key].total_result_count;

      };

      $scope.results.record_count = total_records; // get total search result

      $scope.loading = false; // finish loading

    }

    function failed_handler(response) {
      $scope.error = {
        status: response.status,
        statusText: response.statusText
      };

      $scope.loading = false; // finish loading
    }

    function query_from_swiftype(page, document_types) {

      $scope.loading = true; // start loading

      params.q = $scope.term;
      params.engine_key = $scope.engine_key; // TODO: change this to CONST
      params.per_page = $scope.limits;
      
      params.fetch_fields = $scope.fetch_fields;
      params.search_fields = $scope.search_fields;
      params.filters = $scope.filters;

      // params.document_types = document_types || undefined; // TODO: swiftype reponse error when posting proper array type param, need to figure out why.
      params.page = page || 1;

      api.search(params).then(success_handler, failed_handler);
    }

    $scope.search_by = function(page, document_type) {
      query_from_swiftype(page, document_type);
    };
    
    $scope.keyup = function(event) {

      var keycode = event.keyCode || event.which;

      // ignore arrow keys, shift
      if (((keycode > 36) && (keycode < 41)) || (keycode == 16)) {
        return;
      }
      
      if ( $scope.term && $scope.term.length > 2 ) {
        query_from_swiftype($scope.page);
      } else {
        $scope.results = {};
        $scope.$apply();
      }
    };

  }];

  return {
    restrict: 'E',
    controller: SwiftypeController,
    replace: true,
    templateUrl: function(element, attributes) {
      return attributes.templateUrl;
    },
    link: function(scope, element, attributes) {

      scope.engine_key = attributes.engineKey;
      scope.limits = attributes.limits || 20;
      
      if(attributes.fetchFields) {
        scope.fetch_fields = JSON.parse(attributes.fetchFields);  
      }
      if(attributes.searchFields) {
        scope.search_fields = JSON.parse(attributes.searchFields);  
      }
      if(attributes.filters) {
        scope.filters = JSON.parse(attributes.filters);
      }

      element.bind('keyup', scope.keyup);
    }
  };
}]);
