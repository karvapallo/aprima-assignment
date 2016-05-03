angular.module('aprima-assignment.controllers')

  .controller('CommitsCtrl', function ($scope,
                                      ReposResource,
                                      paginationService,
                                      $http,
                                      $timeout,
                                      $stateParams) {

    $scope.error = false;

    var nextPageUrl = false;
    var options = {
      owner: $stateParams.owner,
      repo: $stateParams.repo
    };

    ReposResource
      .commits(options)
      .$promise
      .then(function (result) {
        nextPageUrl = paginationService.setNextLink(result.$httpHeaders);
        $scope.commits = result;
      });

    $scope.showLoadMore = function showLoadMore() {
      return nextPageUrl;
    };

    $scope.loadMore = function loadMore() {
      $http({ method: 'GET', url: nextPageUrl })
        .then(function (result) {
          nextPageUrl = paginationService.setNextLink(result.headers);
          $scope.commits = $scope.commits.concat(result.data);
        })
        .catch(function (err) {
          $scope.commits = [];
          $scope.error = err.statusText;
        })
        .finally(function () {
          $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        });
    };

  });
