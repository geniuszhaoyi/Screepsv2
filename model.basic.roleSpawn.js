var { Role } = require('model.basic.role')

exports.RoleSpawn = class RoleSpawn extends Role{
    
    /** @param {Spawn} spawn **/
    run (spawn) {
        console.log(spawn.name + " if not assigned");
    }
}
