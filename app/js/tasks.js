'use strict';

angular.module('app.tasks', [])

  .controller('TaskController', function ($scope, $location, TaskService) {

    $scope.list = TaskService.tasks;

    $scope.remove = function (index) {
      var id = $scope.list[index].Id;
      TaskService.remove(id, function (error) {
        if (!error) {
          $scope.list.splice(index, 1);
        }
      });
    };

    $scope.showPopover = function (event) {
      //console.log(event.target);
      $(event.target).popover({
        animation: false,
        html: true,
        trigger: 'focus',
        placement: 'bottom',
        title: 'Actions',
        content: 'Content'
      });
    };

  })

  .factory('TaskService', function ($rootScope, DataService) {

    var i, dao = new DataService('Tasks');

    dao.tasks = [];

    for (i = 1; i < 26; i++) {
      dao.tasks.push({
        person: i,
        name: "Jurek Błaszczyk",
        serial: "#2129",
        status: "Pending",
        description: "To jest opis zadania do wykonania przez osobę wskazaną",
        time: "Tomorrow 12:51 AM",
        equipment: "Tank"
      });
    }

    return dao;

  });