'use strict';

angular.module('app', [
      'app.equipment',
      'app.tasks',
      'app.types',

      'app.common.localstore',
      'app.common.directives',
      'app.common.services',

      'ngRoute',
      'ngAnimate',

      'toaster'
    ])

    .config(function ($routeProvider) {
      $routeProvider
          .when('/', { templateUrl: 'views/types.html' })
          .when('/signin', { templateUrl: 'views/signin.html' })
          .when('/signup', { templateUrl: 'views/signup.html' })
          .when('/tasks', { templateUrl: 'views/tasks.html', authRequired: true })
          .when('/types', { templateUrl: 'views/types.html', authRequired: true })
          .when('/equipment', { templateUrl: 'views/equipment.html', authRequired: true })
          .otherwise({ redirectTo: '/types' });
    })

    .run(function ($rootScope, $timeout, toaster) {

      $rootScope.message = {text: "Initialize shape"};


      $rootScope.$watch('action', function (value) {
        if (value) {
          $rootScope.toast('warning', 'Action', 'Not implemented');
        }
      });

      $rootScope.toast = function (type, title, text) {
        toaster.show(type, title, text, 1000, 'trustedHtml');
      };

      $rootScope.showModal = function (title, text, onYes, onNo) {
        var element = $('.ui.modal');

        $rootScope.modal = {
          title: title,
          text: text
        };

        element
            .modal('setting', {
              closable: true,
              debug: false,
              verbose: false,
              onApprove: onYes,
              onDeny: onNo
            })
            .modal('show');
      };

      $rootScope.installOutsideClickListener = function (element, callback) {

        function outsideClickListener(e) {
          if (element) {
            element.each(function () {
              if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $(this).has(e.target).length === 0) {
                if (typeof callback === 'function' && callback()) {
                  $('html').off('click', outsideClickListener);
                }
              }
            });
          } else {
            $('html').off('click', outsideClickListener);
          }
        }

        $('html').on('click', outsideClickListener);
      };
    })

    .controller('MenuController', function ($scope, $location, accountService) {
      $scope.logout = function () {
        accountService.logout('/signin');
      };

      $scope.$on('$routeChangeSuccess', function () {
      });

    });