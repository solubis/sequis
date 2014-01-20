'use strict';

angular.module('app.equipment', [])

  .factory('EquipmentService', function ($rootScope, DataService) {

    var dao = new DataService('Equipment');

    dao.types = function () {
      var list = [
        {name:""},
        {name: 'BCD'},
        {name: 'Torch'},
        {name: 'Reg'}
      ];
      return list;
    };

    dao.statuses = function () {
      var list = [
        {name:""},
        {name: 'New'},
        {name: 'Used'},
        {name: 'Maintenanced'},
        {name: 'To Sell'},
        {name: 'Broken'},
      ];
      return list;
    };

    dao.maintenanceTypes = function () {
      var list = [
        {name:""},
        {name: 'Visual Inspection'},
        {name: 'Hydro Test'},
        {name: 'Regulator Quick Service'},
        {name: 'Regulator Full Service'},
        {name: 'Repair'},
        {name: 'Custom'},
        {name: 'Check Inventory'}
      ];
      return list;
    };

    dao.persons = function () {
      var list = [
        {name:""},
        {name: 'Samaty'},
        {name: 'Mr. Butla'},
        {name: 'Scubatec'},
        {name: 'Hazem'}
      ];
      return list;
    };

    dao.periods = [
      {name:""},
      {name: 'Year'},
      {name: 'Month'},
      {name: 'Week'},
      {name: 'Day'}
    ];

    return dao;

  })

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

  })

  .controller('EquipmentTypeController', function ($scope, $location, EquipmentService) {

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

  });