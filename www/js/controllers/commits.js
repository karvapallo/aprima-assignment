angular.module('aprima-assignment.controllers')

  .controller('CommitsCtrl', function ($scope,
                                      ReposResource,
                                      $stateParams) {

    $scope.repo = {};

    var options = {
      owner: $stateParams.owner,
      repo: $stateParams.repo
    };

    ReposResource
      .commits(options)
      .$promise
      .then(function (result) {
        $scope.commits = result;
      });

  });
