"use strict";

angular.module('app.contacts')

  .factory('ContactService', function ($rootScope, Firebase, angularFireCollection, angularFire) {

    return {
      collection: function (callback) {
        var list = this.ref();
        return angularFireCollection(list, callback);
      },
      ref: function () {
        return new Firebase($rootScope.FBURL).child('contacts');
      },
      findById: function (id, scope, name) {
        angularFire(this.ref().child(id), scope, name);
      },
      create: function (contact, callback) {
        this.ref().push(contact, callback);
      },
      remove: function (leagueId) {
        var league = this.ref().child(leagueId);
        league.remove();
      }
    };
  }
);