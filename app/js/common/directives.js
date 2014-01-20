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

  .directive('dropdown', function () {
    return {
      restrict: 'C',
      link: function (scope, element) {
        element.dropdown({
          on: 'hover'
        });
      }
    };
  })

  .directive('sidebar', function () {
    return {
      restrict: 'C',
      link: function (scope, element) {
        element.sidebar('attach events', '#sidebar-toggle');
      }
    };
  });

