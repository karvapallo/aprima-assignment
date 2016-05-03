angular.module('aprima-assignment.controllers')

  .controller('SearchCtrl', function ($scope,
                                      SearchResource,
                                      $timeout) {

    $scope.searching = false;
    $scope.error = false;
    $scope.repos = [];
    $scope.keyword = '';

    var totalItems = 0;
    var currentPage = 1;
    var doSearch = function doSearch() {
      $scope.searching = true;
      SearchResource
        .query({path: 'repositories', q: $scope.keyword, page: currentPage })
        .$promise
        .then(function (result) {
          console.log('result.items.length:', result.items.length);
          if (currentPage == 1) {
            $scope.repos = result.items;
          } else {
            $scope.repos = $scope.repos.concat(result.items);
          }

          $timeout(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }, 300);

          totalItems = result.total_count;
        })
        .catch(function (err) {
          console.log(err);
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

          if (newVal == '') {

            $scope.error = false;
            $scope.searching = false;
            $scope.repos = [];
            currentPage = 1;
            return;
          }

          $scope.error = false;
          if (newVal != oldVal) {
            currentPage = 1;
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
      return totalItems > $scope.repos.length;
    };

    $scope.loadMore = function loadMore() {
      currentPage += 1;
      doSearch();
    };

    $scope.$watch('keyword', debounced);
  });
