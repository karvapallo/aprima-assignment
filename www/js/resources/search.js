angular.module('aprima-assignment.resources')
  .service('SearchResource', function($resource) {
    var url = 'https://api.github.com/search/:path';
    var params = {
      path: '@path'
    };
    var actions = {
      query: {
        array: false
      }
    };
    return $resource(url, params, actions);
  });
