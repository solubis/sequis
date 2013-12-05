"use strict";

angular.module('app.maintenance')

  .factory('MaintenanceService', function ($rootScope, Firebase, angularFireCollection, angularFire) {

    return {
      collection: function (callback) {
        var ref = this.ref();
        return angularFireCollection(ref, callback);
      },
      ref: function () {
        return new Firebase($rootScope.FBURL).child('maintenance');
      },
      findById: function (id, scope, name) {
        angularFire(this.ref().child(id), scope, name);
      },
      create: function (record, callback) {
        return this.ref().push(record, callback);
      },
      remove: function (id) {
        var record = this.ref().child(id);
        record.remove();
      }
    };
  });