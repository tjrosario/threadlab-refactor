var users = require('../config/users/users.json');
var utils = require('./utils');

var UserRoles = {
  getRole: function(username) {
    var theUsers = users.users;
    var role;
    var found = utils.objectFindByKey(theUsers, 'username', username);
    
    if (found) {
      found = found[0];
      role = found.role;
    } else {
      role = 'user';
    }
    
    return role;
  }
}

module.exports = UserRoles;
