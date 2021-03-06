var vent = require('./vent').getInstance();

var Actions = {
  auth: function(){
    vent.trigger('auth');
  },

  authLogin: function(){
    vent.trigger('auth:login');
  },

  authLogout: function(){
    vent.trigger('auth:logout');
  },

  createFolder: function(){
    vent.trigger('folder:create');
  },

  updateFolder: function(payload){
    vent.trigger('folder:update', payload);
  },

  updateFolderIndex: function(payload){
    vent.trigger('folderIndex:update', payload);
  },

  createCard: function(payload){
    vent.trigger('card:create', payload);
  },

  updateCard: function(payload){
    vent.trigger('card:update', payload);
  },

  moveCard: function(payload){
    vent.trigger('card:move', payload);
  },

  rearrangeCard: function(payload){
    vent.trigger('card:rearrange', payload);
  },

  updateRoute: function(payload){
    vent.trigger('route:update', payload);
  },

  offFirebase: function(){
    vent.trigger('firebase:off');
  }
};

module.exports = Actions;
