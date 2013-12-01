'use strict';

angular.module('app.common.firebase', ['firebase'])
  .run(function ($rootScope, FBURL) {
    $rootScope.FBURL = FBURL;
  })
  .constant('FBURL', 'https://solubis.firebaseio.com');