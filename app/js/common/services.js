"use strict";

angular.module('app.common.services', [])
  .factory('SampleService', function () {
    var data = {
      descriptions: [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.',
        'Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Cras vel lorem. Etiam pellentesque aliquet tellus. '
      ],
      names: [
        'Jan Kowalski', 'Stefan Dyrman', 'Wiesław Nowak', 'Karol Strasburger', 'Ewa Błaszczyk', 'Muhhamad Ali'
      ]
    };

    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    return {
      sample: function (type) {
        return random(data[type]);
      }
    };

  });