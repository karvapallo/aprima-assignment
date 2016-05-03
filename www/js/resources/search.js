angular.module('aprima-assignment.resources')
  .service('SearchResource', function($resource) {
    var url = 'https://api.github.com/search/:path';
    var params = {
      path: '@path'
    };
    var actions = {
      query: {
        method: 'GET',
        isArray: false,
        interceptor: {
          response: function(response) {
            response.resource.$httpHeaders = response.headers;
            return response.resource;
          }
        }
      }
    };
    return $resource(url, params, actions);
  });
