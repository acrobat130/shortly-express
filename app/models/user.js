var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  // username: "",
  // password: "",
  initialize: function(){
    this.on('creating', this.hashPassword, this)
  },
  hashPassword: function(model, attributes, options){
    bcrypt.hash(model.attributes.password, null, function(err,hash){
      if(err){
        throw err;
      }
      model.set('password', hash);
    });
  },
  comparePassword: function(inputPassword, callback){
    bcrypt.compare(inputPassword, this.get('password'), function(err, match) {
        callback(match);
    })
  }
});

module.exports = User;