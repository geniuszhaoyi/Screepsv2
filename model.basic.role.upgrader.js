var { RoleCreep } = require('model.basic.roleCreep')

exports.roleUpgrader = class roleUpgrader extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(_.sum(creep.carry) == 0) {
            creep.memory.status = 0
        }
        if(_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.status = 1
        }
        if(creep.memory.status == 1) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }else {
            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(target) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
    getRecommendBody() {
        return [WORK, CARRY, MOVE];
    }
    getTag() {
        return 'upgrader';
    }
}
