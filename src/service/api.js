angular.module('ngSwiftype').


service('ngSwiftype.api', [ '$http', 'ngSwiftype.cache', function($http, SwiftypeCache ) {

  var endpoint = 'https://api.swiftype.com/api/v1/public/engines/suggest.json';

  this.search = function(params) {

    if(!params && typeof params !== 'object') {
      return false;
    }

    var config = {};

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
  };
}]);