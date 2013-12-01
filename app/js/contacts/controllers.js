'use strict';

angular.module('app.contacts', [])

  .controller('ContactListController', function ($scope, $location, ContactService) {

    $scope.initData = function () {
      $scope.contacts = ContactService.collection();
    };

    $scope.remove = function (id) {
      ContactService.remove(id);
    };
  })

  .controller('ContactFormController', function ($scope, $routeParams, $location, ContactService) {

    $scope.contact = {};

    $scope.initData = function () {
      if ($routeParams.id) {
        ContactService.findById($routeParams.id, $scope, 'contact');
      }
    };

    $scope.create = function () {
      if ($scope.contact) {
        ContactService.create($scope.contact, function (error) {
          if (!error) {
            $scope.contact = null;
            $location.path('/contacts');
            $scope.$apply();
          } else {
            console.log('[Error] message : ' + error.message);
          }
        });
      }
    };

  });