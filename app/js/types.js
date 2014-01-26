'use strict';

angular.module('app.types', [])

    .factory('TypesService', function ($rootScope, DataService) {

      var i,
          dao = new DataService('Types'),
          colors = ['rgba(133,187,0,1)', 'rgba(125,54,135,1)', 'rgba(17,120,200,1)', 'rgba(245,138,1,1)', "rgba(39,185,240,1)"];

      for (i = 0; i < 20; i++) {
        dao.create({
          name: chance.name(),
          description: chance.paragraph({sentences: 3}),
          color: colors[Math.floor(Math.random() * colors.length)],
          updated: chance.date({string: true, american: false})
        });
      }

      return dao;

    })

    .factory('CommentService', function ($rootScope, DataService) {

      var i,
          dao = new DataService('Comments');

      for (i = 0; i < 3; i++) {
        dao.create({
          user: chance.name(),
          comment: chance.paragraph({sentences: 1}),
          updated: chance.date({string: true, american: false}),
          photo: chance.integer({min: 1, max: 25})
        });
      }

      return dao;

    })

    .controller('TypesController', function ($scope, $element, $location, $timeout, TypesService, CommentService) {

      var form = $element.find('[name=form]'), list = $element.find('.ui.list');

      $scope.installOutsideClickListener(form, function () {
        if ($scope.form.$dirty) {
          console.log("FORM IS DIRTY AND CLICKED OUTSIDE");
        }
        return false;
      });

      $scope.isInvalid = function () {
        return !form.form('validate form');
      };

      $scope.scrollToTop = function () {
        list.animate({scrollTop: list.offset().top}, 'slow');
      };

      $scope.isUnchanged = function () {
        return angular.equals($scope.item, $scope.list[$scope.selectedIndex]);
      };

      $scope.init = function () {
        TypesService.setCollection($scope, 'list');
        CommentService.setCollection($scope, 'comments');

        $scope.listItemActions = {
          select: $scope.select,
          remove: $scope.remove
        };

        form.form({
          name: {
            identifier: 'name',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter  name'
              },
              {
                type: 'length[4]',
                prompt: 'Name needs to be at least 4 characters long'
              }
            ]
          }
        }, {
          inline: 'false'
        });

        $scope.select(0);
      };

      $scope.select = function (index) {
        console.log("SELECT LIST ELEMENT");
        $scope.selectedIndex = index;
        $scope.item = {};
        angular.copy($scope.list[index], $scope.item);
        $timeout(function () {
          $scope.form.$setPristine(true);
        }, 0);
      };

      $scope.remove = function (index) {
        var id = $scope.list[index].Id;
        TypesService.remove(id, function (error) {
          if (!error) {
            $scope.list.splice(index, 1);
          }
        });
      };

      $scope.create = function () {
        $scope.item = {};
        $('input.first').focus();
      };

      $scope.save = function () {

        if ($scope.isInvalid()) {
          return;
        }

        $scope.toast('error', 'Information', 'Your data is saving...');

        if ($scope.item.Id) {
          TypesService.update($scope.item, function (error) {
            if (error) {
              console.log('[Error] : ' + error.message);
            }
          });
        } else {
          TypesService.create($scope.item, function (error) {
            if (error) {
              console.log('[Error] : ' + error.message);
            }
          });
        }

        $scope.form.$setPristine(true);
      };

      $scope.addComment = function () {
        var comment = {
          user: "Active User",
          updated: "Today",
          comment: $scope.comment,
          photo: 10
        };

        CommentService.create(comment, function (error) {
          if (error) {
            console.log('[Error] : ' + error.message);
          }

          $scope.comment = "";
        });
      }

      $scope.init();

      list.niceScroll({cursorcolor: "#6ECFF5"});
    });