"use strict";

angular.module('app.common.directives', [])

    .directive('item', function () {
      return {
        restrict: 'C',
        link: function (scope, element) {
          if (element.parent('.menu, .list').hasClass('selection')) {
            element.on('click', function () {
              element.addClass('active');
              element.siblings('.item').each(function () {
                    $(this).removeClass('active');
                  }
              );
            });
          }
        }
      };
    })

    .directive('dropdown', function ($timeout) {
      return {
        restrict: 'C',
        link: function (scope, element, attrs) {
          $timeout(function () {
            element.dropdown({
              onChange: function (value) {
                if (angular.isDefined(attrs.ngModel)) {
                  scope[attrs.ngModel] = value;
                  scope.$apply();
                }
              }
            });
          }, 0);
        }
      };
    })

    .directive('popup', function () {
      return {
        restrict: "A",
        replace: true,
        link: function (scope, element, attrs) {
          element.popup({
            on: 'hover',
            html: attrs.popup,
            variation: 'large inverted',
            delay: 2000,
            debug: false,
            verbose: false
          });
        }
      };
    })

    .directive('modal', function () {
      return {
        restrict: 'E',
        templateUrl: 'templates/modal.tpl.html'
      };
    })

    .directive('sidebar', function () {
      return {
        restrict: 'C',
        link: function (scope, element) {
          element.sidebar('attach events', '#sidebar-toggle');
        }
      };
    })

    .directive('tab', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          if (element.parent().hasClass('selection')) {
            var tab = element.parent().siblings('[tab=' + attrs.tab + ']');

            if (element.hasClass('active')) {
              tab.addClass('active');
              tab.removeClass('ng-hide');
            } else {
              tab.addClass('ng-hide');
              tab.removeClass('active');
            }

            element.on('click', function () {
              tab.addClass('active');
              tab.removeClass('ng-hide');
              tab.siblings('[tab]').each(function () {
                    $(this).removeClass('active');
                    $(this).addClass('ng-hide');
                  }
              );
            });
          }
        }
      };
    })

    .directive('listItem', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          corner: "=",
          stripe: "=",
          title: "=",
          description: "=",
          footer: "=",
          select: "&",
          remove: "&",
          setting: "&"
        },
        link: function (scope, element, attrs) {
          scope.showSetting = angular.isDefined(attrs.setting);
          scope.showRemove = angular.isDefined(attrs.remove);
        },
        templateUrl: 'templates/listItem.tpl.html'
      };
    })

    .directive('message', function () {
      return {
        restrict: "E",
        replace: true,
        templateUrl: "templates/message.tpl.html"
      };
    });

