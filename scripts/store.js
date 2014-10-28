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
  if(typeof input === 'undefined') return undefined;
  return JSON.parse(JSON.stringify(input));
};

/**
 * Init data
 */
var defaultFolder = {
  name: 'defaultFolder',
  cards: {}
};

var _initStore = function(userId){
  var FirebaseModel = Backbone.Firebase.Model.extend({
    firebase: "https://learnot.firebaseIO.com/people/" + userId
  });

  Store = new FirebaseModel();

  Store.firebase.on('value', function(storeSnap){
  //todo
  //fill defaults after loading
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
    var userObj;
    if(user && user.id) {
      userObj = {
        id: user.id,
        uid: user.uid,
        provider: user.provider,
        username: user.email
      };

      //bind the store to a dynamic URL
      _initStore(userObj.id);

      Store.set({
        user: userObj,
        loggedIn: true
      });
    }else{
      Store && Store.set({
        loggedIn: false
      });
    }

  }.bind(this));
});

vent.on('auth:login', function(){
  firebaseAuth.login('google', {
    rememberMe: true,
    scope: 'https://www.googleapis.com/auth/plus.login,' +
           'https://www.googleapis.com/auth/drive'
  });
});

vent.on('auth:logout', function(){
  firebaseAuth.logout();
  //true to reload from the server rather than the cache
  location.reload(true);
});


/**
 * For folders
 */

vent.on('folder:create', function(){
  var foldersCopy = deepcopy(Store.get('folders'));
  foldersCopy = foldersCopy || [];
  var newFolderName = 'Lesson ' + foldersCopy.length;
  var newFolder = _.extend({}, defaultFolder, {name: newFolderName});
  foldersCopy.push(newFolder);

  Store.set('folders', foldersCopy);
});

vent.on('folder:update', function(payload){
  var foldersCopy = deepcopy(Store.get('folders'));
  foldersCopy = foldersCopy || [];

  var currentFolder = foldersCopy[payload.folderIndex];
  currentFolder.name = payload.folderName;
  Store.set('folders', foldersCopy);
});

vent.on('folderIndex:update', function(newIndex){
  Store && Store.set('folderIndex', newIndex);
});

/**
 * For cards
 */
vent.on('card:create', function(payload){
  var currentFolderIndex = Store.get('folderIndex') || 0;

  console.log('card:create', payload);
  //deal with undefined from embedly
  for(var key in payload) {
    if(payload.hasOwnProperty(key)){
      payload[key] = payload[key] || '';
    }
  }

  var cardsCopy = deepcopy(Store.get('cards'));
  cardsCopy = cardsCopy || [];

  payload.folderIndex = currentFolderIndex;
  payload.id = cardsCopy.length;  //todo, not a good idea

  cardsCopy.push(payload);

  Store.set('cards', cardsCopy);
});

vent.on('card:update', function(payload){
  var cardsCopy = deepcopy(Store.get('cards'));
  cardsCopy = cardsCopy || [];

  var matchedIndex = 0;
  _.each(cardsCopy, function(card, index){
    if(card.id + '' === payload.id + '') {
      console.log('match card');
      matchedIndex = index;
      return;
    }
  });

  //replace the card in matchedIndex with payload
  cardsCopy.splice(matchedIndex, 1, payload);

  Store.set('cards', cardsCopy);
});

/**
 * For Firebase
 */
vent.on('firebase:off', function(){
  firebaseRef.off();
});

module.exports = dfd.promise();
