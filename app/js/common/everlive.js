"use strict";

angular.module('app.common.everlive', [])

/*********************** Service ****************************/


  .factory('accountService', function ($rootScope, $location) {

    var db;
    var service = {};
    var token = localStorage.getItem("token");

    db = new Everlive({
      apiKey: 'tSr2gLhwyuwjw2U2',
      token: token
    });

    $rootScope.db = db;

    service.logout = function (redirect) {
      db.Users.logout(
        function () {
          $rootScope.user = null;
          $rootScope.$apply();
        }, function (error) {
          console.log(JSON.stringify(error));
        });

      if (redirect) {
        $location.path(redirect);
      }
    };

    service.loadProfile = function () {
      db.Users.currentUser(
        function (data) {
          console.log(JSON.stringify(data));
          $rootScope.user = {
            name: data.result.DisplayName
          };
          $rootScope.$apply();
        },
        function (error) {
          console.log(JSON.stringify(error));
          $rootScope.showAlert(JSON.stringify(error));
          $rootScope.$apply();
        });
    };

    service.login = function (email, password) {
      db.Users.login(email, password,
        function (data) {
          localStorage.setItem("token", data.result.access_token);
          service.loadProfile();
          $location.path('/');
          $rootScope.$apply();
        },
        function (error) {
          console.log(JSON.stringify(error));
          $rootScope.showAlert(error.message);
          $rootScope.$apply();
        }
      );
    };

    service.signUp = function (name, email, password) {
      var user = {
        Email: email,
        DisplayName: name,
        Role: 'authors'
      };

      db.Users.register(email, password,
        user,
        function () {
          service.login(email, password);
        },
        function (error) {
          console.log(JSON.stringify(error));
          $rootScope.showAlert(JSON.stringify(error));
          $rootScope.$apply();
        });
    };

    service.isLoggedIn = function () {
      return $rootScope.user;
    };

    service.loadProfile();

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

  .factory('DataService', function ($rootScope) {

    var DAO = function (tableName) {
      this.table = $rootScope.db.data(tableName);
    };

    DAO.prototype.collection = function (scope, name) {

      this.table.get().then(function (data) {
        scope[name] = data.result;
        scope.$apply();
      }, function (error) {
        console.log(error);
      });
    };

    DAO.prototype.getById = function (id, scope, name) {
      this.table.getById(id).then(
        function (data) {
          scope[name] = data.result;
          scope.$apply();
        },
        function (error) {
          console.log(JSON.stringify(error));
        });
    };

    DAO.prototype.create = function (record, callback) {
      this.table.create(record,
        function (data) {
          console.log(JSON.stringify(data));
          callback(null, data.result);
        },
        function (error) {
          console.log(JSON.stringify(error));
          callback(error);
        });
    };

    DAO.prototype.update = function (record, callback) {
      this.table.updateSingle(record,
        function (data) {
          console.log(JSON.stringify(data));
          callback(null, data.result);
        },
        function (error) {
          console.log(JSON.stringify(error));
          callback(error);
        });
    };

    DAO.prototype.remove = function (id, callback) {
      this.table.destroySingle({ Id: id },
        function () {
          callback();
        },
        function (error) {
          console.log(JSON.stringify(error));
          callback(error);
        });
    };

    return DAO;

  });

