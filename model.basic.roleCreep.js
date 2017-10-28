var { Role } = require('model.basic.role')

exports.RoleCreep = class RoleCreep extends Role{
    
    /** @param {Creep} creep **/
    run (creep) {
        creep.say('Assign me');
    }
}
