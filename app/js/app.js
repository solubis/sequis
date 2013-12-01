'use strict';

angular.module('app', [
    'app.contacts',
    'app.common.firebase',
    'app.common.account',
    'app.common.header',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/default.html' })
      .when('/signin', { templateUrl: 'views/account/signin.html' })
      .when('/signup', { templateUrl: 'views/account/signup.html' })
      .when('/contacts', { templateUrl: 'views/contacts/list.html', authRequired: true })
      .when('/contacts/create', { templateUrl: 'views/contacts/edit.html', authRequired: true })
      .when('/contacts/:id', { templateUrl: 'views/contacts/edit.html', authRequired: true })
      .otherwise({ redirectTo: '/' });
  });