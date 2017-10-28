var { Role } = require('model.basic.role')
var { roleHarvester } = require('model.basic.role.harvester')
var { roleUpgrader } = require('model.basic.role.upgrader')
var { roleBuilder } = require('model.basic.role.builder')

exports.roleContent = class roleContent{
    
    /** @param {String} type **/
    constructor(type) {
        this.role = new Role();
        if(type == 'harvester') {
            this.role = new roleHarvester();
        }
        if(type == 'upgrader') {
            this.role = new roleUpgrader();
        }
        if(type == 'builder') {
            this.role = new roleBuilder();
        }
    }
    
    /** @param {Creep} creep **/
    run (creep) {
        this.role.run(creep);
    }
}
