'use strict';

angular.module('app.maintenance', [])

  .controller('MaintenanceListController', function ($scope, $location, $routeParams, MaintenanceService) {

    $scope.initData = function () {
      $scope.list = MaintenanceService.collection();
    };

    $scope.remove = function (id) {
      MaintenanceService.remove(id);
    };
  })

  .controller('MaintenanceFormController', function ($scope, $routeParams, $location, MaintenanceService) {

    $scope.record = {};
    $scope.types = MaintenanceService.types();

    $scope.initData = function () {
      if ($routeParams.id) {
        MaintenanceService.findById($routeParams.id, $scope, 'record');
      }
    };

    $scope.create = function () {
      if ($scope.record) {
        MaintenanceService.create($scope.record, function (error) {
          if (!error) {
            $scope.record = null;
            $location.path('/maintenance');
            $scope.$apply();
          } else {
            console.log('[Error] message : ' + error.message);
          }
        });
      }
    };

  });