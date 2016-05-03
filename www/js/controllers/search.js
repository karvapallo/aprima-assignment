angular.module('aprima-assignment.controllers')

  .controller('SearchCtrl', function ($scope,
                                      SearchResource,
                                      $timeout,
                                      $http,
                                      paginationService) {

    $scope.searching = false;
    $scope.error = false;
    $scope.repos = [];
    $scope.keyword = '';

    var nextPageUrl = false;
    var doSearch = function doSearch() {
      $scope.searching = true;
      SearchResource
        .query({path: 'repositories', q: $scope.keyword })
        .$promise
        .then(function (result) {
          nextPageUrl = paginationService.setNextLink(result.$httpHeaders);
          $scope.repos = result.items;
        })
        .catch(function (err) {
          $scope.repos = [];
          $scope.error = err.statusText;
        })
        .finally(function () {
          $scope.searching = false;
        });
    };

    var debounced = _.debounce(
      function (newVal, oldVal) {
        $scope.$apply(function() {

          $scope.error = false;

          if (newVal === '') {
            $scope.searching = false;
            $scope.repos = [];
            return;
          }

          doSearch();
        });
      },
      300,
      {
        leading: false,
        trailing: true
      }
    );

    $scope.showLoadMore = function showLoadMore() {
      return nextPageUrl;
    };

    $scope.loadMore = function loadMore() {
      $http({ method: 'GET', url: nextPageUrl })
        .then(function (result) {
          nextPageUrl = paginationService.setNextLink(result.headers);
          $scope.repos = $scope.repos.concat(result.data.items);
        })
        .catch(function (err) {
          $scope.repos = [];
          $scope.error = err.statusText;
        })
        .finally(function () {
          $timeout(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        });
    };

    $scope.$watch('keyword', debounced);
  });
