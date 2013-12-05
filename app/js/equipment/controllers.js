'use strict';

angular.module('app.equipment', [])

  .controller('EquipmentListController', function ($scope, $location, EquipmentService) {

    $scope.initData = function () {
      $scope.list = EquipmentService.collection();

    };

    $scope.remove = function (id) {
      EquipmentService.remove(id);
    };
  })

  .controller('EquipmentFormController', function ($scope, $routeParams, $location, EquipmentService, MaintenanceService) {

    $scope.record = {};
    $scope.record.schedules = [];
    $scope.types = EquipmentService.types();

    $scope.initData = function () {
      if ($routeParams.id) {
        EquipmentService.findById($routeParams.id, $scope, 'record');
      }
    };

    $scope.create = function () {
      if ($scope.record) {
        EquipmentService.create($scope.record, function (error) {
          if (!error) {
            $scope.record = null;
            $location.path('/equipment');
            $scope.$apply();
          } else {
            console.log('[Error] message : ' + error.message);
          }
        });
      }
    };

    $scope.clearForm = function() {
      $scope.schedule = {};
    };

    $scope.saveSchedule = function(){
      var ref = MaintenanceService.create($scope.schedule, function(error){

      });

      console.log(ref.name());

      $scope.record.schedules.push(ref.name);
    };

  });