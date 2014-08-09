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

  offFirebase: function(){
    vent.trigger('firebase:off');
  }
};

module.exports = Actions;