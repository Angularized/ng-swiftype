angular.module('ngSwiftype').

factory('ngSwiftype.cache', [ '$cacheFactory', function($cacheFactory){
  return $cacheFactory('cache');
}]);