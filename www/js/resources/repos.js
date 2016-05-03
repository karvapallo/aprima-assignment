angular.module('aprima-assignment.resources')
  .service('ReposResource', function($resource) {
    var url = 'https://api.github.com/repos/:owner/:repo';
    var params = {
      owner: '@owner',
      repo: '@repo'
    };
    var actions = {
      commits: {
        method: 'GET',
        isArray: true,
        url: url + '/commits',
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
