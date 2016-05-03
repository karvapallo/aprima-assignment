angular.module('aprima-assignment.controllers')

  .controller('DetailCtrl', function ($scope,
                                      ReposResource,
                                      $stateParams) {

    $scope.repo = {};

    var options = {
      owner: $stateParams.owner,
      repo: $stateParams.repo
    };

    ReposResource
      .get(
        options
      )
      .$promise
      .then(function (result) {
        $scope.repo = result;
      });

  });
