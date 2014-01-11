"use strict";

angular.module('app.equipment')

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

  });