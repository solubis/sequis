"use strict";

angular.module('app.equipment')

  .factory('EquipmentService', function ($rootScope, Firebase, angularFireCollection, angularFire) {

    return {
      collection: function (callback) {
        var ref = this.ref();
        return angularFireCollection(ref, callback);
      },
      ref: function () {
        return new Firebase($rootScope.FBURL).child('equipment');
      },
      findById: function (id, scope, name) {
        var record = this.ref().child(id);
        angularFire(record, scope, name);
      },
      create: function (record, callback) {
        return this.ref().push(record, callback);
      },
      remove: function (id) {
        var record = this.ref().child(id);
        record.remove();
      },
      types: function(callback){
        var ref = new Firebase($rootScope.FBURL).child('equipmentType');

        var list = angularFireCollection(ref, function(data){
          var empty = !data.hasChildren();

          if (empty){
            console.log("Empty collection");

            ref.push().set({name:"Tank"});
            ref.push().set({name:"BCD"});
            ref.push().set({name:"Torch"});
          }

          if (callback){
            callback();
          }
        });

        return list;
      }
    };
  });