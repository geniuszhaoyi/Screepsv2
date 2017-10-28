var { RoleCreep } = require('model.basic.roleCreep')

exports.roleBuilder = class roleBuilder extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(_.sum(creep.carry) == 0) {
            creep.memory.status = 0
        }
        if(_.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.status = 1
        }
        if(creep.memory.status == 1) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                creep.moveTo(targets[0]);
                creep.build(targets[0]);
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
        return 'harvester';
    }
}
