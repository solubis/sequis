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

    .directive('dropdown', function ($parse) {
      return {
        restrict: 'A',
        require: 'ngModel',
        controller: function ($scope, $element, $attrs, $transclude) {
        },
        link: function (scope, element, attrs, controller) {

          var html = '<div class="menu">',
              options = scope.$eval(attrs.options),
              icon = '', color = '';

          for (var i = 0, length = options.length; i < length; i++) {

            if (options[i].color){
              color = 'style="color:' + options[i].color + ';"';
            }

            if (options[i].icon) {
              icon = '<i class="' + options[i].icon + ' icon"'+color+'></i>'
            }

            html += '<div class="item" data-value="' + options[i].value + '">' + icon + options[i].text + '</div>';
          }

          html += '</div>';

          element.append(html);

          element.dropdown('setting', {
            onChange: function (value) {
              scope.$apply(function () {
                controller.$setViewValue(value);
              });
            }
          });
        }
      }
    })

    .
    directive('popup', function () {
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

