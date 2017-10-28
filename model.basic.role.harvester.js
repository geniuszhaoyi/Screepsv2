var { RoleCreep } = require('model.basic.roleCreep')

exports.roleHarvester = class roleHarvester extends RoleCreep{

    /** @param {Creep} creep **/
    run (creep) {
        if(_.sum(creep.carry) == creep.carryCapacity) {
            const storage = Game.getObjectById('3342fdad4248fa0');
            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
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
