var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var User = db.Model.extend({
  tableName: 'users',
  // username: "",
  // password: "",
  initialize: function(){
    this.on('creating', this.hashPassword)
  },
  hashPassword: function(){
var lego = Promise.promisify(bcrypt.hash);

   return lego(this.get('password'),null,null)
    .bind(this)
    .then(function(hash){
        this.set('password', hash);
    });
  },
   
  comparePassword: function(inputPassword, callback){
      console.log("password----------------------", this.get('password'));
      console.log("inputPassword---------------", inputPassword);

    
    bcrypt.compare(inputPassword, this.get('password'), function(err, res) {
      console.log("res------------", res);
        // callback(match);
    })
  }
});

module.exports = User;