'use strict';

angular.module('app', [
    'app.equipment',
    'app.maintenance',
    'app.common.firebase',
    'app.common.account',
    'app.common.header',
    'app.common.directives',

    'ui.bootstrap',

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
  });