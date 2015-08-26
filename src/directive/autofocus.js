angular.module('ngSwiftype').

directive('autoFocus', function() {
  return {
    link: {
      post: function postLink(scope, element) {
        element[0].focus();
      }
    }
  }
});