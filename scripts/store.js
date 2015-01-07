/* global Firebase */
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

//rely on firebase to generate unique id
var uidURL = "https://learnot.firebaseIO.com/utils/uid";
var uidRef = new Firebase(uidURL);
var getUid = function(){
  var newChildRef = uidRef.push();
  return newChildRef.key();
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
  firebaseRef.onAuth(function(authData) {
    var userObj;

    if (authData) {
      // user authenticated with Firebase
      userObj = {
        id: authData.twitter.username,
        uid: authData.uid,
        provider: authData.provider
      };

      //bind the store to a dynamic URL
      _initStore(userObj.id);

      Store.set({
        user: userObj,
        loggedIn: true
      });
    }else{
      // user is logged out
      Store && Store.set({
        loggedIn: false
      });
    }
  });
});

vent.on('auth:login', function(){
  firebaseRef.authWithOAuthPopup("twitter", function(err, authData) {
    if(err){
      console.log('Auth err!');
    }
  });
});

vent.on('auth:logout', function(){
  firebaseRef.unauth();
  //true to reload from the server rather than the cache
  location.reload(true);
});

/**
 * For route
 */
vent.on('route:update', function(payload){
  Store && Store.set('route', payload);
  // console.log('payload', payload);
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
  if(payload.folderName){
    currentFolder.name = payload.folderName;
  }

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

  //deal with undefined from embedly
  for(var key in payload) {
    if(payload.hasOwnProperty(key)){
      payload[key] = payload[key] || '';
    }
  }

  var cardId = getUid();

  payload.folderIndex = currentFolderIndex;
  payload.id = cardId;

  var cardsCopy = deepcopy(Store.get('cards')) || {};
  cardsCopy[cardId] = payload;

  var foldersCopy = deepcopy(Store.get('folders')) || [];
  foldersCopy[currentFolderIndex].cardIds = foldersCopy[currentFolderIndex].cardIds || [];
  foldersCopy[currentFolderIndex].cardIds.push(cardId);

  Store.set({
    'cards':cardsCopy,
    'folders':foldersCopy
  });
});

vent.on('card:update', function(payload){
  var cardsCopy = deepcopy(Store.get('cards')) || {};
  cardsCopy[payload.id] = payload;
  Store.set('cards', cardsCopy);
});

vent.on('card:move', function(payload){
  var foldersCopy = deepcopy(Store.get('folders')) || [];
  var currentFolderIndex = Store.get('route').params.folderName;

  //noop
  if(currentFolderIndex + '' === payload.folderIndex + '') {
    return;
  }

  //add to new folder
  foldersCopy[payload.folderIndex].cardIds = foldersCopy[payload.folderIndex].cardIds || [];
  foldersCopy[payload.folderIndex].cardIds.push(payload.cardId);
  //remove from old folder
  foldersCopy[currentFolderIndex].cardIds = _.without(foldersCopy[currentFolderIndex].cardIds, payload.cardId);

  Store.set('folders', foldersCopy);
});

vent.on('card:rearrange', function(payload){
  var foldersCopy = deepcopy(Store.get('folders')) || [];
  var currentFolderIndex = Store.get('route').params.folderName;

  var draggingIndex = _.indexOf(foldersCopy[currentFolderIndex].cardIds, payload.draggingCardId);

  var left = foldersCopy[currentFolderIndex].cardIds.slice(0, draggingIndex);
  var right = foldersCopy[currentFolderIndex].cardIds.slice(draggingIndex + 1);

  //in both cases, insert after the stationary card
  //left
  if(_.indexOf(left, payload.stationaryCardId) !== -1){
    left.splice(_.indexOf(left, payload.stationaryCardId) + 1, 0, payload.draggingCardId);
  }
  //right
  if(_.indexOf(right, payload.stationaryCardId) !== -1){
    right.splice(_.indexOf(right, payload.stationaryCardId) + 1, 0, payload.draggingCardId);
  }

  //merge and remove duplicates if any
  foldersCopy[currentFolderIndex].cardIds = _.union(left, right);

  Store.set('folders', foldersCopy);
});

/**
 * For Firebase
 */
vent.on('firebase:off', function(){
  firebaseRef.off();
});

module.exports = dfd.promise();
