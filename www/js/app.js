// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('aprima-assignment', [
  'ionic',
  'aprima-assignment.resources',
  'aprima-assignment.controllers',
  'aprima-assignment.services',
  'ngCordova',
  'ig.linkHeaderParser'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        abstract: true,
        templateUrl: 'templates/app.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'content': {
            controller: 'SearchCtrl',
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.detail', {
        url: '/repos/:owner/:repo',
        views: {
          'content': {
            templateUrl: 'templates/detail.html'
          }
        }
      })

      .state('app.commits', {
        url: '/repos/:owner/:repo/commits',
        views: {
          'content': {
            templateUrl: 'templates/commits.html'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/search');
  });

angular.module('aprima-assignment.controllers', []);
angular.module('aprima-assignment.resources', ['ngResource']);
angular.module('aprima-assignment.services', []);
