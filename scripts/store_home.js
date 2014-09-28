/* global Firebase, FirebaseSimpleLogin */
var vent = require('./vent').getInstance(),
  _ = require('underscore'),
  $ = require('jquery'),
  Backbone = require('backbone');

var firebaseRef = new Firebase("//learnot.firebaseIO.com/home");
var FirebaseModel = Backbone.Firebase.Model.extend({
  firebase: firebaseRef
});
var HomeStore = new FirebaseModel();

//if necessary, fill defaults after loading
HomeStore.firebase.on('value', function(storeSnap){
  // console.log('HomeStore storeSnap', storeSnap.val());
});

/**
 * For Firebase
 */
vent.on('firebase:off', function(){
  firebaseRef.off();
});

module.exports = HomeStore;
