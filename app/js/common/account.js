"use strict";

angular.module('app.common.account', ['app.common.firebase', 'ngRoute']);

angular.module('app.common.account')
  .run(function ($rootScope, $timeout) {

    $rootScope.setAlert = function (message) {
      $rootScope.alert = {text: message};

      $timeout(function () {
        $rootScope.hideAlert();
      }, 3000);
    };

    $rootScope.hideAlert = function () {
      $rootScope.alert = null;
    };

    $rootScope.setInfo = function (message) {
      $rootScope.info = {text: message};
      $timeout($rootScope.hideInfo, 2000);
    };

    $rootScope.hideInfo = function () {
      $rootScope.info = null;
    };

  })


/*********************** Service ****************************/


  .factory('accountService', function ($rootScope, $location, angularFire, angularFireAuth, Firebase) {

    var db;
    var service = {};

    db = new Firebase($rootScope.FBURL);

    angularFireAuth.initialize(db, {scope: $rootScope, name: "user"});

    service.logout = function (redirect) {

      angularFireAuth.logout();

      if (redirect) {
        $location.path(redirect);
      }
    };

    $rootScope.$on("angularFireAuth:logout", function () {
      console.log("[angularFireAuth:logout] user: " + $rootScope.user);

      if ($rootScope.dispose) {
        $rootScope.dispose();
        delete $rootScope.dispose;
      }

      delete $rootScope.profile;
    });

    $rootScope.$on("angularFireAuth:error", function (evt, error) {
      console.log("[angularFireAuth:error] error: " + error.message);
      $rootScope.setAlert(error.message);
    });

    $rootScope.$on("angularFireAuth:login", function (event, user) {

      var ref = new Firebase($rootScope.FBURL + '/users/' + user.id);
      var promise = angularFire(ref, $rootScope, 'profile');

      console.log("[angularFireAuth:login] user: " + user.email);

      promise.then(function (dispose) {

        if (!$rootScope.profile) {
          if ($rootScope.tempProfile) {
            $rootScope.profile = angular.copy($rootScope.tempProfile, $rootScope.profile);
            delete $rootScope.tempProfile;
          } else {
            $rootScope.profile = {name: user.email, email: user.email, id: user.id};
          }
        }

        if (dispose) {
          $rootScope.dispose = dispose;
        }

      }, function (error) {
        console.log(error);
      });

      $location.path('/equipment/-J9st7sbcGDFpN8sDBzL');
    });

    service.login = function (email, password) {
      if (service.isLoggedIn()) {
        console.log("Logout first");
        return;
      }
      angularFireAuth.login("password", {
        email: email,
        password: password,
        rememberMe: true
      });
    };

    service.signUp = function (name, email, password) {

      if (service.isLoggedIn()) {
        console.log("Logout first");
        return;
      }

      angularFireAuth.createUser(email, password, function (error, user) {
        if (user) {
          $rootScope.tempProfile = {name: name || email, email: email, id: user.id};
        }

        if (error) {
          $rootScope.setAlert(error.message);
          console.log("[Create User] Error: " + error);
        }
      });
    };

    service.isLoggedIn = function () {
      return $rootScope.user;
    };

    return service;
  })


/******************* Controller  ***************************/


  .controller('AccountController', function ($rootScope, accountService) {

    this.email = null;
    this.password = null;
    this.user = null;

    this.login = function () {
      accountService.login(this.email, this.password);
    };

    this.logout = function () {
      accountService.logout();
    };

    this.signUp = function () {
      accountService.signUp(this.name, this.email, this.password);
    };

    this.isLoggedIn = function () {
      return accountService.isLoggedIn();
    };

  })


/*********************** Status Directive **********************/


  .directive('status', function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "views/account/status.html"
    };
  });