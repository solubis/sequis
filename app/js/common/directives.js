"use strict";

angular.module('app.common.directives', [])
  .directive('formInput', function () {
    return {
      restrict: 'E',
      scope: {
        id: "@",
        label: "@",
        refModel: "="
      },
      replace: true,
      template: '<div class="form-group">\n  <label for="{{ id }}">{{ label }}</label>\n  <input type="text" class="form-control"  ng-model="refModel" id="{{ id }}" placeholder="{{ label }}">\n</div>'
    };
  });