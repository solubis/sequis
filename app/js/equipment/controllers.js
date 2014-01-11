'use strict';

angular.module('app.equipment', [])

  .controller('EquipmentListController', function ($scope, $location, EquipmentService) {

    $scope.initData = function () {
      EquipmentService.collection($scope, 'list');

    };

    $scope.remove = function (index) {
      var id = $scope.list[index].Id;
      EquipmentService.remove(id, function (error) {
        if (!error) {
          $scope.list.splice(index, 1);
        }
      });
    };

  })

  .controller('EquipmentFormController', function ($scope, $routeParams, $location, EquipmentService) {

    $scope.initData = function () {

      $scope.dao = EquipmentService;

      $scope.types = EquipmentService.types();
      $scope.statuses = EquipmentService.statuses();
      $scope.maintenanceTypes = EquipmentService.maintenanceTypes();
      $scope.persons = EquipmentService.persons();

      $scope.$watch('record.schedules.length', function (count) {

        $scope.summary = {
          total: count ? count : 0,
          done: 0,
          coming: 0
        };
      });

      if ($routeParams.id) {
        EquipmentService.getById($routeParams.id, $scope, 'record');
      } else {
        $scope.record = {
          status: "New"
        };
        $scope.record.schedules = [];
      }
    };

    $scope.save = function () {
      if ($scope.record.Id) {
        EquipmentService.update($scope.record, function (error) {
          if (!error) {
            $scope.record = null;
            $location.path('/equipment');
          } else {
            console.log('[Error] : ' + error.message);
          }
        });
      } else {
        EquipmentService.create($scope.record, function (error) {
          if (!error) {
            $scope.record = null;
            $location.path('/equipment');
          } else {
            console.log('[Error] : ' + error.message);
          }
        });
      }
    };

    $scope.hideForm = function () {
      $scope.schedule = {};

      $('#panelBody').collapse('hide');
      $scope.isFormShowed = false;
    };

    $scope.showForm = function () {
      $('#panelBody').collapse('show');
      $scope.isFormShowed = true;
    };

    $scope.saveSchedule = function () {
      var schedule = angular.copy($scope.schedule);

      $scope.record.schedules.push(schedule);
      $scope.hideForm();
      $scope.schedule = {};
    };

    $scope.window = {
      open: function () {
        $scope.modal.center().open();
      }
    };


  });