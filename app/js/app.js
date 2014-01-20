'use strict';

angular.module('app', [
    'app.equipment',
    'app.tasks',
    'app.types',

    'app.common.localstore',
    'app.common.directives',
    'app.common.services',

    'ngRoute',
    'ngAnimate'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/types.html' })
      .when('/signin', { templateUrl: 'views/signin.html' })
      .when('/signup', { templateUrl: 'views/signup.html' })
      .when('/tasks', { templateUrl: 'views/tasks.html', authRequired: true })
      .when('/types', { templateUrl: 'views/types.html', authRequired: true })
      .when('/equipment', { templateUrl: 'views/equipment.html', authRequired: true })
      .otherwise({ redirectTo: '/types' });
  })

  .run(function ($rootScope, $document, $timeout) {
    $rootScope.showAlert = function (message) {
      $rootScope.alert = {text: message};
      $timeout($rootScope.hideAlert, 3000);
    };

    $rootScope.hideAlert = function () {
      $rootScope.alert = null;
    };

    $rootScope.showInfo = function (message) {
      $rootScope.info = {text: message};
      $timeout($rootScope.hideInfo, 2000);
    };

    $rootScope.hideInfo = function () {
      $rootScope.info = null;
    };


  })

  .controller('MenuController', function ($scope, $location, accountService) {

    $scope.logout = function () {
      accountService.logout('/signin');
    };

    $scope.$on('$routeChangeSuccess', function () {
    });

  })

  .directive('status', function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "views/status.html"
    };
  });