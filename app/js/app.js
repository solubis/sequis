'use strict';

angular.module('app', [
    'app.equipment',

    'app.common.localstore',
    'app.common.header',
    'app.common.directives',

    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/default.html' })
      .when('/signin', { templateUrl: 'views/account/signin.html' })
      .when('/signup', { templateUrl: 'views/account/signup.html' })
      .when('/equipment', { templateUrl: 'views/equipment/list.html', authRequired: true })
      .when('/equipment/create', { templateUrl: 'views/equipment/edit.html', authRequired: true })
      .when('/equipment/:id', { templateUrl: 'views/equipment/edit.html', authRequired: true })
      .otherwise({ redirectTo: '/equipment' });
  })
  .run(function ($rootScope, $timeout) {
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
  .directive('status', function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "views/account/status.html"
    };
  });