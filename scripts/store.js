/* global Firebase, FirebaseSimpleLogin */
var vent = require('./vent').getInstance(),
  _ = require('underscore'),
  $ = require('jquery'),
  Backbone = require('backbone');

var dfd = $.Deferred();

//vanilla Backbone will be overwritten as soon as firebase is ready
var Store;

var firebaseRef = new Firebase("//learnot.firebaseIO.com");
var firebaseAuth;

/**
 * Utils
 */
//todo
//use a better one
var deepcopy = function(input){
  return JSON.parse(JSON.stringify(input));
};

/**
 * Init data
 */

var _initStore = function(userId){
  var FirebaseModel = Backbone.Firebase.Model.extend({
    firebase: "https://learnot.firebaseIO.com/people/" + userId
  });

  Store = new FirebaseModel();

  //fill defaults after loading
  Store.firebase.on('value', function(){
    console.log('storeSnap', storeSnap.val());

  });

  dfd.resolve(Store);
};

/**
 * For auth
 */

vent.on('auth', function(){
  //auth callback will be invoked any time that
  //the user's authentication state changed
  firebaseAuth = new FirebaseSimpleLogin(firebaseRef, function(error, user) {
    if (error) return;

    if(user && user.id) {
      //bind the store to a dynamic URL
      _initStore(user.id);

      var userObj = {
        id: user.id,
        uid: user.uid,
        provider: user.provider,
        username: user.username,
        accessToken: user.accessToken
      };

      Store.set({
        user: userObj
      });

    }
  }.bind(this));
});

vent.on('auth:login', function(){
  firebaseAuth.login('github', {
    rememberMe: true
  });
});

vent.on('auth:logout', function(){
  firebaseAuth.logout();
  //true to reload from the server rather than the cache
  location.reload(true);
});


/**
 * For Firebase
 */
vent.on('firebase:off', function(){
  firebaseRef.off();
});

module.exports = dfd.promise();