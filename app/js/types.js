'use strict';

angular.module('app.types', [])

  .factory('TypesService', function ($rootScope, DataService, SampleService) {

    var i, dao = new DataService('Types'),
      icons = ['regulator', 'wetsuit', 'torch', 'twinset', 'tank'];

    for (i = 0; i < 20; i++) {
      dao.create({
        name: SampleService.sample('names'),
        description: SampleService.sample('descriptions'),
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }

    return dao;

  })

  .controller('TypesController', function ($scope, $location, TypesService) {

    $scope.initData = function () {
      TypesService.setCollection($scope, 'list');
      $scope.select($scope.list[0]);
    };

    $scope.select = function(item){
      $scope.item = {};
      angular.copy(item, $scope.item);
    };

    $scope.remove = function (index) {
      var id = $scope.list[index].Id;
      TypesService.remove(id, function (error) {
        if (!error) {
          $scope.list.splice(index, 1);
        }
      });
    };

    $scope.create = function(){
      $scope.item = {};
      $('input.first').focus();
    };

    $scope.save = function () {
      if ($scope.item.Id) {
        TypesService.update($scope.item, function (error) {
          if (!error) {
            $scope.item = null;
          } else {
            console.log('[Error] : ' + error.message);
          }
        });
      } else {
        TypesService.create($scope.item, function (error) {
          if (!error) {
            $scope.item = null;
          } else {
            console.log('[Error] : ' + error.message);
          }
        });
      }
    };

    $scope.initData();

  });