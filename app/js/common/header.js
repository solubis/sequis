'use strict';

angular.module('app.common.header', ['app.common.account'])

  .controller('HeaderController', function ($scope, $location, accountService) {

    $scope.logout = function () {
      accountService.logout('/signin');
    };

    $scope.navbarEntries = [
      {
        "title": "Equipment",
        "link": "/equipment"
      }
    ];

    $scope.$on('$routeChangeSuccess', function () {
      $scope.navbarEntries.forEach(
        function (data) {
          data.isActive = ($location.path().indexOf(data.link) === 0);
        }
      );
    });

  })

  .directive('test', function () {
    return {
      restrict:'A',
      link: function( scope, element, attrs){

        element.bind('click', function(){
          /*global $*/
          var menu = $('.navbar-collapse');

          menu.addClass('collapse');
          menu.removeClass('in');
        });
      }
    };
  });